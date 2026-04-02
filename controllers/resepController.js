const { Resep, DetailResep, sequelize, Pasien, Obat } = require("../models");
const respon = require("../helpers/responseHelper");
const getResep = async (req, res) => {
  try {
    const data = await Resep.findAll({
      include: {
        model: DetailResep,
        as: "detailReseps",
      },
    });
    return respon.success(res, "Success get all resep", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const getResepById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Resep.findByPk(id, {
      include: {
        model: DetailResep,
        as: "detailReseps",
      },
    });
    if (!data) {
      return respon.notFound(res, "Resep not found");
    }
    return respon.success(res, "Succes get resep by id", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

// masih salah, karena ganti relasi, schema juga
const createResep = async (req, res) => {
  try {
    const { dokter_id, pasien_id, tanggal, DetailReseps } = req.body;
    // 1. Validasi detail tidak kosong
    if (!DetailReseps || DetailReseps.length === 0) {
      return respon.badRequest(res, "Detail resep tidak boleh kosong");
    }
    // cek pasien valid
    const pasien = await Pasien.findByPk(pasien_id);
    if (!pasien) {
      return respon.notFound(res, "Pasien tidak ditemukan");
    }
    // iterasi semua obat id dari req
    const obatIds = [...new Set(DetailReseps.map((item) => item.obat_id))];
    // cek apakah obat id dari table Obat ada
    const existingObat = await Obat.findAll({
      where: { id: obatIds },
      attributes: ["id"],
    });

    if (existingObat.length !== obatIds.length) {
      return respon.badRequest(res, "Ada obat tidak valid");
    }
    const result = await sequelize.transaction(async (t) => {
      const newResep = await Resep.create(
        { dokter_id, pasien_id, tanggal },
        { transaction: t },
      ); // transaksi dimulai setelah validasi lolos
      const detailData = DetailReseps.map((item) => ({
        resep_id: newResep.id,
        obat_id: item.obat_id,
        jumlah: item.jumlah,
        aturan_pakai: item.aturan_pakai,
      }));

      await DetailResep.bulkCreate(detailData, { transaction: t });
      return { newResep, detailData };
    });

    return respon.success(res, "Resep berhasil dibuat", {
      resep: result.newResep,
      detail: result.detailData,
    });
  } catch (error) {
    console.log(error);
    respon.serverError(res, error.message);
  }
};

const updateResep = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { dokter_id, tanggal } = req.body;
    const { id } = req.params;

    const resep = await Resep.findByPk(id);

    if (!resep) {
      await t.rollback();
      return respon.notFound(res, "Resep not found");
    }

    // 🚫 blok update detail
    if (req.body.DetailReseps !== undefined) {
      await t.rollback();
      return respon.badRequest(res, "Tidak boleh mengubah detail resep");
    }

    // ✅ manual filtering
    const updateData = {};

    if (dokter_id !== undefined) {
      updateData.dokter_id = dokter_id;
    }

    if (tanggal !== undefined) {
      updateData.tanggal = tanggal;
    }

    // ⚠️ optional: kalau gak ada yang diupdate
    if (Object.keys(updateData).length === 0) {
      await t.rollback();
      return respon.badRequest(res, "Tidak ada data yang diupdate");
    }

    await resep.update(updateData, { transaction: t });

    await t.commit();

    return respon.success(res, "Success update resep", resep);
  } catch (error) {
    await t.rollback();
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

module.exports = {
  getResep,
  getResepById,
  createResep,
  updateResep,
};
