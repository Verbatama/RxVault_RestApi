const { JenisMutasi } = require("../models");
const respon = require("../helpers/responseHelper");

const getJenisMutasi = async (req, res) => {
  try {
    const data = await JenisMutasi.findAll();
    return respon.success(res, "Success get all jenis mutasi", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const getJenisMutasiById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await JenisMutasi.findByPk(id);

    if (!data) {
      return respon.notFound(res, "Jenis mutasi not found");
    }
    return respon.success(res, "Success get jenis mutasi by id", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const createJenisMutasi = async (req, res) => {
  try {
    const newJenisMutasi = await JenisMutasi.create(req.body);
    return respon.success(res, "Success create jenis mutasi", newJenisMutasi);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const updateJenisMutasi = async (req, res) => {
  try {
    const { id } = req.params;
    const jenisMutasiData = await JenisMutasi.findByPk(id);

    if (!jenisMutasiData) {
      return respon.notFound(res, "Jenis mutasi not found");
    }
    const updatedJenisMutasi = await jenisMutasiData.update(req.body);
    return respon.success(
      res,
      "Success update jenis mutasi",
      updatedJenisMutasi,
    );
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

module.exports = {
  getJenisMutasi,
  getJenisMutasiById,
  createJenisMutasi,
  updateJenisMutasi,
};
