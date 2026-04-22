const respon = require('../helpers/responseHelper');
const {
  Stok,
  ProdukObat,
  MutasiStok,
  Lokasi,
  sequelize,
  Kunjungan,
  Resep,
  DetailResep,
  Dispensing,
  StatusDispensing,
  Obat,
  DispensingAuditLog,
} = require('../models');
const getApotekLokasi = async (transaction) => {
  const allLokasi = await Lokasi.findAll({ transaction });
  return allLokasi.find((item) => String(item.nama_lokasi || '').toLowerCase() === 'apotek') || null;
};

const consumeStokApotekByProdukObat = async ({ produk_obat_id, qtyNeeded, apotekLokasiId, transaction }) => {
  const stokCandidates = await Stok.findAll({
    where: {
      lokasi_id: apotekLokasiId,
      produk_obat_id: Number(produk_obat_id),
    },
    order: [['expired_date', 'ASC'], ['id', 'ASC']],
    transaction,
    lock: transaction.LOCK.UPDATE,
  });

  let remaining = Number(qtyNeeded);
  const consumed = [];

  for (const row of stokCandidates) {
    if (remaining <= 0) {
      break;
    }
    const qtyStock = Number(row.jumlah_obat || 0);
    if (qtyStock <= 0) {
      continue;
    }

    const used = Math.min(qtyStock, remaining);
    row.jumlah_obat = qtyStock - used;
    await row.save({ transaction });

    consumed.push({
      nomor_batch: row.nomor_batch,
      jumlah: used,
      produk_obat_id: row.produk_obat_id,
    });
    remaining -= used;
  }

  return {
    success: remaining <= 0,
    consumed,
    remaining,
  };
};

const consumeStokApotekByObat = async ({ obat_id, qtyNeeded, apotekLokasiId, transaction }) => {
  const stokCandidates = await Stok.findAll({
    where: { lokasi_id: apotekLokasiId },
    include: [
      {
        model: ProdukObat,
        as: 'produkObat',
        where: { obat_id },
        required: true,
      },
    ],
    order: [['expired_date', 'ASC'], ['id', 'ASC']],
    transaction,
    lock: transaction.LOCK.UPDATE,
  });

  let remaining = Number(qtyNeeded);
  const consumed = [];

  for (const row of stokCandidates) {
    if (remaining <= 0) {
      break;
    }
    const qtyStock = Number(row.jumlah_obat || 0);
    if (qtyStock <= 0) {
      continue;
    }
    const used = Math.min(qtyStock, remaining);
    row.jumlah_obat = qtyStock - used;
    await row.save({ transaction });

    consumed.push({
      nomor_batch: row.nomor_batch,
      jumlah: used,
      produk_obat_id: row.produk_obat_id,
    });
    remaining -= used;
  }

  return {
    success: remaining <= 0,
    consumed,
    remaining,
  };
};

const createStokKeluar = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { obat_id, produk_obat_id, nomor_batch, jumlah_obat, penerima, ke_lokasi_id } = req.body;

    const apotek = await getApotekLokasi(t);
    if (!apotek) {
      await t.rollback();
      return respon.notFound(res, 'Lokasi Apotek belum tersedia');
    }

    // resolve produk_obat_id either from payload or by obat_id
    let prodId = produk_obat_id;
    let produkObat = null;
    if (!prodId) {
      produkObat = await ProdukObat.findOne({ where: { obat_id }, transaction: t });
      if (!produkObat) {
        await t.rollback();
        return respon.notFound(res, 'ProdukObat not found for given obat_id');
      }
      prodId = produkObat.id;
    } else {
      produkObat = await ProdukObat.findByPk(prodId, { transaction: t });
      if (!produkObat) {
        await t.rollback();
        return respon.notFound(res, 'ProdukObat not found for given produk_obat_id');
      }
    }

    const stok = await Stok.findOne({
      where: {
        produk_obat_id: prodId,
        nomor_batch,
        lokasi_id: apotek.id,
      },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!stok) {
      await t.rollback();
      return respon.notFound(res, 'Stok apotek tidak ditemukan untuk batch tersebut');
    }

    if (stok.jumlah_obat < Number(jumlah_obat)) {
      await t.rollback();
      return respon.serverError(res, 'Not enough stock');
    }

    stok.jumlah_obat = stok.jumlah_obat - Number(jumlah_obat);
    await stok.save({ transaction: t });

    // create mutasi stok log (jenis_mutasi_id = 2 => Keluar)
    await MutasiStok.create({
      obat_id: obat_id || produkObat.obat_id,
      dari_lokasi_id: apotek.id,
      ke_lokasi_id: ke_lokasi_id || apotek.id,
      jumlah_obat: Number(jumlah_obat),
      nomor_batch,
      tanggal_mutasi: new Date(),
      jenis_mutasi_id: 2,
      supplier_id: null,
    }, { transaction: t });

    await t.commit();
    return respon.success(res, 'Stok keluar recorded', {
      produk_obat_id: prodId,
      nomor_batch,
      jumlah_obat,
      penerima,
      lokasi_asal: apotek.nama_lokasi,
      sisa_stok_apotek: Number(stok.jumlah_obat),
    });
  } catch (error) {
    await t.rollback();
    console.error(error);
    return respon.serverError(res, error.message);
  }
}

const processStokKeluarByNoReg = async (req, res) => {
  const t = await sequelize.transaction();
  const endpoint = 'POST:/api/stok-keluar/by-no-reg';
  try {
    const { no_registrasi, apoteker_id, items } = req.body;

    const apotek = await getApotekLokasi(t);
    if (!apotek) {
      await t.rollback();
      return respon.notFound(res, 'Lokasi Apotek belum tersedia');
    }

    const statusSudah = await StatusDispensing.findOne({
      where: { nama_status: 'Sudah' },
      transaction: t,
    });
    const statusPending = await StatusDispensing.findOne({
      where: { nama_status: 'Pending' },
      transaction: t,
    });
    if (!statusSudah || !statusPending) {
      await t.rollback();
      return respon.badRequest(res, 'Master status dispensing (Sudah/Pending) belum lengkap');
    }

    const kunjungan = await Kunjungan.findOne({
      where: { no_registrasi: String(no_registrasi) },
      include: [
        {
          model: Resep,
          as: 'reseps',
          include: [
            {
              model: DetailResep,
              as: 'detailReseps',
              include: [
                {
                  model: Obat,
                  as: 'obat',
                },
                {
                  model: Dispensing,
                  as: 'dispensing',
                  where: {
                    is_stok_keluar: false,
                  },
                  required: false,
                },
              ],
            },
          ],
        },
      ],
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    if (!kunjungan) {
      await t.rollback();
      return respon.notFound(res, 'No registrasi tidak ditemukan');
    }

    const processed = [];
    const failed = [];

    const selectionMap = new Map();
    if (Array.isArray(items)) {
      for (const item of items) {
        if (!item) {
          continue;
        }
        selectionMap.set(Number(item.detail_resep_id), Number(item.produk_obat_id));
      }
    }

    for (const resep of kunjungan.reseps || []) {
      for (const detail of resep.detailReseps || []) {
        const dispensingRow = (detail.dispensing || []).slice().sort((a, b) => b.id - a.id)[0] || null;
        if (!dispensingRow) {
          continue;
        }

        const qtyNeeded = Number(detail.jumlah);

        let consumption = null;
        let selectedProdukObatId = null;
        if (selectionMap.size > 0) {
          selectedProdukObatId = selectionMap.get(Number(detail.id)) || null;
          if (!selectedProdukObatId) {
            failed.push({
              detail_resep_id: detail.id,
              nama_obat: detail.obat?.nama_obat || '-',
              alasan: 'Produk obat belum dipilih (dari rekap stok apotek)',
            });
            continue;
          }

          const produk = await ProdukObat.findByPk(selectedProdukObatId, { transaction: t });
          if (!produk) {
            failed.push({
              detail_resep_id: detail.id,
              nama_obat: detail.obat?.nama_obat || '-',
              alasan: 'Produk obat tidak ditemukan',
            });
            continue;
          }

          if (Number(produk.obat_id) !== Number(detail.obat_id)) {
            failed.push({
              detail_resep_id: detail.id,
              nama_obat: detail.obat?.nama_obat || '-',
              alasan: 'Produk obat yang dipilih tidak sesuai dengan obat di resep',
            });
            continue;
          }

          consumption = await consumeStokApotekByProdukObat({
            produk_obat_id: selectedProdukObatId,
            qtyNeeded,
            apotekLokasiId: apotek.id,
            transaction: t,
          });
        } else {
          consumption = await consumeStokApotekByObat({
            obat_id: detail.obat_id,
            qtyNeeded,
            apotekLokasiId: apotek.id,
            transaction: t,
          });
        }

        if (!consumption.success) {
          await dispensingRow.update(
            {
              status_dispensing_id: statusPending.id,
            },
            { transaction: t },
          );

          failed.push({
            detail_resep_id: detail.id,
            nama_obat: detail.obat?.nama_obat || '-',
            alasan: selectedProdukObatId
              ? 'Stok apotek tidak cukup untuk produk obat yang dipilih'
              : 'Stok apotek tidak cukup saat proses stok keluar',
          });
          continue;
        }

        for (const used of consumption.consumed) {
          await MutasiStok.create({
            obat_id: detail.obat_id,
            dari_lokasi_id: apotek.id,
            ke_lokasi_id: apotek.id,
            jumlah_obat: used.jumlah,
            nomor_batch: used.nomor_batch,
            tanggal_mutasi: new Date(),
            jenis_mutasi_id: 2,
            supplier_id: null,
          }, { transaction: t });
        }

        await dispensingRow.update({
          apoteker_id,
          dispensingAt: new Date(),
          is_stok_keluar: true,
          status_dispensing_id: statusSudah.id,
        }, { transaction: t });

        processed.push({
          detail_resep_id: detail.id,
          nama_obat: detail.obat?.nama_obat || '-',
          jumlah_keluar: qtyNeeded,
          produk_obat_id: selectedProdukObatId,
          batches: consumption.consumed,
        });
      }
    }

    await t.commit();
    const responseBody = {
      success: true,
      message: 'Success process stok keluar by no registrasi',
      data: {
        no_registrasi: String(no_registrasi),
        processed,
        failed,
      },
    };

    await DispensingAuditLog.create({
      endpoint,
      action_type: 'PROCESS_STOK_KELUAR',
      no_registrasi: String(no_registrasi),
      apoteker_id,
      status: 'SUCCESS',
      processed_count: processed.length,
      failed_count: failed.length,
      response_message: responseBody.message,
      metadata: { processed, failed },
    });

    return res.status(200).json(responseBody);
  } catch (error) {
    await t.rollback();

    try {
      await DispensingAuditLog.create({
        endpoint,
        action_type: 'PROCESS_STOK_KELUAR',
        no_registrasi: String(req.body?.no_registrasi || '-'),
        apoteker_id: req.body?.apoteker_id || null,
        status: 'FAILED',
        processed_count: 0,
        failed_count: 1,
        response_message: error.message,
      });
    } catch (auditError) {
      console.error(auditError);
    }

    console.error(error);
    return respon.serverError(res, error.message);
  }
};

module.exports = { createStokKeluar, processStokKeluarByNoReg };
