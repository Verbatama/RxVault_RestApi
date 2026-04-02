// controllers/mutasiStokController.js
const { MutasiStok, Stok, sequelize } = require("../models");

const createMutasiStok = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const {
      obat_id,
      dari_lokasi_id,
      ke_lokasi_id,
      jumlah_obat,
      nomor_batch,
      tanggal_mutasi,
      jenis_mutasi_id,
      supplier_id,
    } = req.body;

    // 1. Insert mutasi
    const mutasi = await MutasiStok.create(
      {
        obat_id,
        dari_lokasi_id,
        ke_lokasi_id,
        jumlah_obat,
        nomor_batch,
        tanggal_mutasi,
        jenis_mutasi_id,
        supplier_id,
      },
      { transaction: t },
    );

    // 2. Kurangi stok asal
    const stokAsal = await Stok.findOne({
      where: { obat_id, lokasi_id: dari_lokasi_id, nomor_batch },
      transaction: t,
    });

    if (!stokAsal || stokAsal.jumlah_obat < jumlah_obat) {
      throw new Error("Stok asal tidak cukup");
    }

    stokAsal.jumlah_obat -= jumlah_obat;
    await stokAsal.save({ transaction: t });

    // 3. Tambah stok tujuan
    let stokTujuan = await Stok.findOne({
      where: { obat_id, lokasi_id: ke_lokasi_id, nomor_batch },
      transaction: t,
    });

    if (stokTujuan) {
      stokTujuan.jumlah_obat += jumlah_obat;
      await stokTujuan.save({ transaction: t });
    } else {
      await Stok.create(
        {
          obat_id,
          lokasi_id: ke_lokasi_id,
          nomor_batch,
          jumlah_obat,
          expired_date: stokAsal.expired_date,
        },
        { transaction: t },
      );
    }

    // commit kalau semua sukses
    await t.commit();

    res.status(201).json({ data: mutasi });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createMutasiStok,
};
