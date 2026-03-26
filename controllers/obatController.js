const respon = require("../helpers/responseHelper");
const { Obat } = require("../models");

const getObat = async (req, res) => {
  try {
    const data = await Obat.findAll();
    return respon.success(res, "Success get all obat", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const getObatById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Obat.findByPk(id);
    if (!data) {
      return respon.notFound(res, "Obat not found");
    }
    return respon.success(res, "Success get obat by id", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const createObat = async (req, res) => {
  try {
    const newObat = await Obat.create(req.body);
    return respon.success(res, "Success create obat", newObat);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};
const updateObat = async (req, res) => {
  try {
    const { id } = req.params;
    const obat = await Obat.findByPk(id);
    if (!obat) {
      return respon.notFound(res, "Obat not found");
    }
    await obat.update(req.body);
    return respon.success(res, "Success update obat", obat);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

module.exports = { getObat, getObatById, createObat, updateObat };
