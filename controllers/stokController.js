const { Stok, Lokasi, ProdukObat, MutasiStok, Obat, GolonganObat, BentukObat, SatuanDosis, sequelize } = require("../models");
const respon = require("../helpers/responseHelper");

const resolveLokasi = async ({ lokasi_id, lokasi_nama }) => {
  if (lokasi_id) {
    return Lokasi.findByPk(lokasi_id);
  }

  if (lokasi_nama) {
    const nama = String(lokasi_nama).toLowerCase();
    const allLokasi = await Lokasi.findAll();
    return allLokasi.find((item) => String(item.nama_lokasi).toLowerCase() === nama) || null;
  }

  const allLokasi = await Lokasi.findAll();
  return allLokasi.find((item) => String(item.nama_lokasi).toLowerCase() === "gudang") || null;
};

const resolveLokasiByName = async (nama_lokasi) => {
  const allLokasi = await Lokasi.findAll();
  return allLokasi.find(
    (item) => String(item.nama_lokasi).toLowerCase() === String(nama_lokasi).toLowerCase(),
  ) || null;
};

const createStokPerLokasi = async (req, res) => {
  try {
    const { produk_obat_id, nomor_batch, jumlah_obat, expired_date, lokasi_id, lokasi_nama } = req.body;

    const produkObat = await ProdukObat.findByPk(produk_obat_id);
    if (!produkObat) {
      return respon.notFound(res, "Produk obat not found");
    }

    const lokasi = await resolveLokasi({ lokasi_id, lokasi_nama });
    if (!lokasi) {
      return respon.notFound(res, "Lokasi not found (gunakan lokasi_id valid atau lokasi_nama: Apotek/Gudang)");
    }

    const existing = await Stok.findOne({
      where: {
        produk_obat_id,
        lokasi_id: lokasi.id,
        nomor_batch,
      },
    });

    if (existing) {
      existing.jumlah_obat = Number(existing.jumlah_obat) + Number(jumlah_obat);
      if (expired_date) {
        existing.expired_date = expired_date;
      }
      await existing.save();

      return respon.success(res, "Success update jumlah stok", existing);
    }

    const newStok = await Stok.create({
      produk_obat_id,
      lokasi_id: lokasi.id,
      nomor_batch,
      jumlah_obat,
      expired_date,
    });

    return respon.success(res, "Success create stok per lokasi", newStok);
  } catch (error) {
    console.error(error);
    return respon.serverError(res, error.message);
  }
};

const getJumlahStok = async (req, res) => {
  try {
    const { obat_id, produk_obat_id } = req.query;

    const stokRows = await Stok.findAll({
      include: [
        {
          model: Lokasi,
          as: "lokasi",
          attributes: ["id", "nama_lokasi"],
        },
        {
          model: ProdukObat,
          as: "produkObat",
          attributes: ["id", "obat_id"],
          required: Boolean(obat_id),
          where: obat_id ? { obat_id: Number(obat_id) } : undefined,
        },
      ],
      where: produk_obat_id ? { produk_obat_id: Number(produk_obat_id) } : undefined,
    });

    const summary = {
      total: 0,
      apotek: 0,
      gudang: 0,
    };

    const perLokasiMap = new Map();

    for (const row of stokRows) {
      const qty = Number(row.jumlah_obat) || 0;
      const namaLokasi = String(row.lokasi?.nama_lokasi || "LAINNYA").toUpperCase();
      const lokasiKey = row.lokasi?.id || 0;

      summary.total += qty;
      if (namaLokasi === "APOTEK") {
        summary.apotek += qty;
      } else if (namaLokasi === "GUDANG") {
        summary.gudang += qty;
      }

      if (!perLokasiMap.has(lokasiKey)) {
        perLokasiMap.set(lokasiKey, {
          lokasi_id: row.lokasi?.id || null,
          nama_lokasi: row.lokasi?.nama_lokasi || "Lainnya",
          jumlah: 0,
        });
      }
      perLokasiMap.get(lokasiKey).jumlah += qty;
    }

    return respon.success(res, "Success get jumlah stok", {
      filter: {
        obat_id: obat_id ? Number(obat_id) : null,
        produk_obat_id: produk_obat_id ? Number(produk_obat_id) : null,
      },
      summary,
      per_lokasi: Array.from(perLokasiMap.values()),
    });
  } catch (error) {
    console.error(error);
    return respon.serverError(res, error.message);
  }
};

const getRekapStokObat = async (req, res) => {
  try {
    const stokRows = await Stok.findAll({
      include: [
        {
          model: Lokasi,
          as: "lokasi",
          attributes: ["id", "nama_lokasi"],
        },
        {
          model: ProdukObat,
          as: "produkObat",
          include: [
            {
              model: Obat,
              as: "obat",
              attributes: ["id", "nama_obat", "golongan_obat_id"],
              include: [
                {
                  model: GolonganObat,
                  as: "golonganObat",
                  attributes: ["id", "nama_golongan_obat"],
                },
              ],
            },
            {
              model: BentukObat,
              as: "bentukObat",
              attributes: ["id", "nama_bentuk_obat"],
            },
            {
              model: SatuanDosis,
              as: "satuanDosis",
              attributes: ["id", "nama_satuan_dosis", "bentuk_obat_id"],
            },
          ],
          required: true,
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const grouped = new Map();

    for (const row of stokRows) {
      const produk = row.produkObat;
      const obat = produk?.obat;
      const golongan = obat?.golonganObat;
      const bentuk = produk?.bentukObat;
      const satuan = produk?.satuanDosis;
      const key = [
        obat?.id || '-',
        golongan?.id || '-',
        bentuk?.id || '-',
        Number(produk?.dosis || 0),
        satuan?.id || produk?.satuan_dosis_id || String(produk?.satuan_dosis || '').toLowerCase(),
      ].join('|');

      if (!grouped.has(key)) {
        grouped.set(key, {
          produk_obat_id: produk?.id || null,
          obat_id: obat?.id || null,
          nama_obat: obat?.nama_obat || '-',
          golongan_obat_id: golongan?.id || null,
          nama_golongan_obat: golongan?.nama_golongan_obat || '-',
          bentuk_obat_id: bentuk?.id || null,
          nama_bentuk_obat: bentuk?.nama_bentuk_obat || '-',
          dosis: Number(produk?.dosis || 0),
          satuan_dosis_id: satuan?.id || produk?.satuan_dosis_id || null,
          satuan_dosis: satuan?.nama_satuan_dosis || produk?.satuan_dosis || '-',
          stok_total: 0,
          stok_gudang: 0,
          stok_apotek: 0,
        });
      }

      const item = grouped.get(key);
      const qty = Number(row.jumlah_obat || 0);
      const lokasiNama = String(row.lokasi?.nama_lokasi || '').toLowerCase();
      item.stok_total += qty;
      if (lokasiNama === 'gudang') {
        item.stok_gudang += qty;
      }
      if (lokasiNama === 'apotek') {
        item.stok_apotek += qty;
      }
    }

    return respon.success(res, 'Success get rekap stok obat', Array.from(grouped.values()));
  } catch (error) {
    console.error(error);
    return respon.serverError(res, error.message);
  }
};

const transferStok = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const {
      produk_obat_id,
      obat_id,
      golongan_obat_id,
      jumlah_obat,
      dari_lokasi_id,
      ke_lokasi_id,
      dari_lokasi_nama,
      ke_lokasi_nama,
    } = req.body;

    const lokasiAsal = dari_lokasi_id
      ? await Lokasi.findByPk(dari_lokasi_id)
      : await resolveLokasiByName(dari_lokasi_nama || "Gudang");
    const lokasiTujuan = ke_lokasi_id
      ? await Lokasi.findByPk(ke_lokasi_id)
      : await resolveLokasiByName(ke_lokasi_nama || "Apotek");

    if (!lokasiAsal || !lokasiTujuan) {
      await t.rollback();
      return respon.notFound(res, "Lokasi asal/tujuan tidak ditemukan");
    }

    if (lokasiAsal.id === lokasiTujuan.id) {
      await t.rollback();
      return respon.badRequest(res, "Lokasi asal dan tujuan tidak boleh sama");
    }

    const produkFilterId = produk_obat_id ? Number(produk_obat_id) : null;
    const produk = produkFilterId
      ? await ProdukObat.findByPk(produkFilterId, { transaction: t })
      : null;
    const obat = produk
      ? await Obat.findByPk(produk.obat_id, { transaction: t })
      : await Obat.findByPk(obat_id, { transaction: t });

    if (!obat) {
      await t.rollback();
      return respon.notFound(res, "Obat not found");
    }

    if (produkFilterId && !produk) {
      await t.rollback();
      return respon.notFound(res, "Produk obat not found");
    }

    if (golongan_obat_id && Number(obat.golongan_obat_id) !== Number(golongan_obat_id)) {
      await t.rollback();
      return respon.badRequest(res, "Golongan obat tidak sesuai dengan obat yang dipilih");
    }

    if (produk && Number(produk.obat_id) !== Number(obat.id)) {
      await t.rollback();
      return respon.badRequest(res, "Produk obat tidak sesuai dengan obat yang dipilih");
    }

    const stokAsalRows = await Stok.findAll({
      where: {
        lokasi_id: lokasiAsal.id,
      },
      include: [
        {
          model: ProdukObat,
          as: "produkObat",
          where: produkFilterId ? { id: produkFilterId } : { obat_id: obat.id },
          required: true,
        },
      ],
      order: [["expired_date", "ASC"], ["id", "ASC"]],
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    if (stokAsalRows.length === 0) {
      await t.rollback();
      return respon.notFound(res, "Stok asal tidak ditemukan untuk obat tersebut");
    }

    const qtyTransfer = Number(jumlah_obat || 0);
    const totalAvailable = stokAsalRows.reduce((acc, row) => acc + Number(row.jumlah_obat || 0), 0);
    if (totalAvailable < qtyTransfer) {
      await t.rollback();
      return respon.badRequest(res, "Jumlah stok asal tidak cukup");
    }

    let remaining = qtyTransfer;
    const movedDetails = [];

    for (const asalRow of stokAsalRows) {
      if (remaining <= 0) {
        break;
      }

      const qtyAsal = Number(asalRow.jumlah_obat || 0);
      if (qtyAsal <= 0) {
        continue;
      }

      const movedQty = Math.min(qtyAsal, remaining);
      asalRow.jumlah_obat = qtyAsal - movedQty;
      await asalRow.save({ transaction: t });

      let stokTujuan = await Stok.findOne({
        where: {
          produk_obat_id: asalRow.produk_obat_id,
          lokasi_id: lokasiTujuan.id,
          nomor_batch: asalRow.nomor_batch,
        },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (!stokTujuan) {
        stokTujuan = await Stok.create(
          {
            produk_obat_id: asalRow.produk_obat_id,
            lokasi_id: lokasiTujuan.id,
            nomor_batch: asalRow.nomor_batch,
            jumlah_obat: movedQty,
            expired_date: asalRow.expired_date,
          },
          { transaction: t },
        );
      } else {
        stokTujuan.jumlah_obat = Number(stokTujuan.jumlah_obat) + movedQty;
        await stokTujuan.save({ transaction: t });
      }

      await MutasiStok.create(
        {
          obat_id: obat.id,
          dari_lokasi_id: lokasiAsal.id,
          ke_lokasi_id: lokasiTujuan.id,
          jumlah_obat: movedQty,
          nomor_batch: asalRow.nomor_batch,
          tanggal_mutasi: new Date(),
          jenis_mutasi_id: 3,
          supplier_id: null,
        },
        { transaction: t },
      );

      movedDetails.push({
        produk_obat_id: asalRow.produk_obat_id,
        moved_qty: movedQty,
      });
      remaining -= movedQty;
    }

    await t.commit();

    return respon.success(res, "Success transfer stok", {
      produk_obat_id: produk?.id || null,
      obat_id: obat.id,
      nama_obat: obat.nama_obat,
      jumlah_transfer: qtyTransfer,
      dari: {
        lokasi_id: lokasiAsal.id,
        nama_lokasi: lokasiAsal.nama_lokasi,
      },
      ke: {
        lokasi_id: lokasiTujuan.id,
        nama_lokasi: lokasiTujuan.nama_lokasi,
      },
      moved_details: movedDetails,
    });
  } catch (error) {
    await t.rollback();
    console.error(error);
    return respon.serverError(res, error.message);
  }
};

module.exports = {
  createStokPerLokasi,
  getJumlahStok,
  getRekapStokObat,
  transferStok,
};
