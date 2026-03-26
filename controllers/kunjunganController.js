const { Kunjungan } = require("../models");
const respon = require("../helpers/responseHelper");

const getKunjungan = async (req, res) => {
  try {
    const data = await Kunjungan.findAll();
    return respon.success(res, "Success get all kunjungan", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const getKunjunganById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Kunjungan.findByPk(id);
    if (!data) {
      return respon.notFound(res, "Kunjungan not found");
    }
    return respon.success(res, "Success get kunjungan by id", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const createKunjungan = async (req, res) => {
  try {
    const newKunjungan = await Kunjungan.create(req.body);
    return respon.success(res, "Success create kunjungan", newKunjungan);
  } catch (error) {
    console.log(error);
    return respon.notFound(res, error.message);
  }
};

const updateKunjungan = async (req, res) => {
  try {
    const { id } = req.params;
    const kunjungan = await Kunjungan.findByPk(id);
    if (!kunjungan) {
      return respon.notFound(res, "Kunjungan not found");
    }
    await kunjungan.update(req.body);
    return respon.success(res, "Success update kunjungan", kunjungan);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

module.exports = {
  getKunjungan,
  getKunjunganById,
  createKunjungan,
  updateKunjungan,
};
