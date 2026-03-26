const { GolonganObat } = require("../models");
const respon = require("../helpers/responseHelper");

const getGolonganObat = async (req, res) => {
  try {
    const data = await GolonganObat.findAll();
    return respon.success(res, "Succes get all golongan obat", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const getGolonganObatById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await GolonganObat.findByPk(id);

    if (!data) {
      return respon.notFound(res, "Golongan obat not found");
    }
    return respon.success(res, "Succes get golongan obat by id");
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const createGolonganObat = async (req, res) => {
  try {
    const newGolonganObat = await GolonganObat.create(req.body);
    return respon.success(res, "Succes created golongan obat", newGolonganObat);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const updateGolonganObat = async (req, res) => {
  try {
    const { id } = req.params;
    const golonganObat = await GolonganObat.findByPk(id);
    if (!golonganObat) {
      return respon.notFound(res, "Golongan obat not foud");
    }
    await golonganObat.update(req.body);
    return respon.success(res, "Succes update golongan obat", golonganObat);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const softDeleteGolonganObat = async (req, res) => {
  try {
    const { id } = req.params;
    const golonganObat = await GolonganObat.findByPk(id);
    if (!golonganObat) {
      return respon.notFound(res, "Golongan obat not found");
    }
    await golonganObat.destroy();

    return respon.success(res, "Succes delete golongan obat");
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

module.exports = {
  getGolonganObat,
  getGolonganObatById,
  createGolonganObat,
  updateGolonganObat,
  softDeleteGolonganObat,
};
