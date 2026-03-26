const { Lokasi } = require("../models");
const respon = require("../helpers/responseHelper");

const getLokasi = async (req, res) => {
  try {
    const data = await Lokasi.findAll();
    return respon.success(res, "Success get all lokasi", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const getLokasiById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Lokasi.findByPk(id);

    if (!data) {
      return respon.notFound(res, "Lokasi not found");
    }
    return respon.success(res, "Success get lokasi by id", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const createLokasi = async (req, res) => {
  try {
    const newLokasi = await Lokasi.create(req.body);
    return respon.success(res, "Success create lokasi", newLokasi);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const updateLokasi = async (req, res) => {
  try {
    const { id } = req.params;
    const lokasi = await Lokasi.findByPk(id);

    if (!lokasi) {
      return respon.notFound(res, "Lokasi not found");
    }

    await lokasi.update(req.body);
    return respon.success(res, "Success update lokasi", lokasi);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

module.exports = {
  getLokasi,
  getLokasiById,
  createLokasi,
  updateLokasi,
};
