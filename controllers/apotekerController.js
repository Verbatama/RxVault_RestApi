const { Apoteker } = require("../models");
const respon = require("../helpers/responseHelper");
const { getLokasiById } = require("./lokasiController");

const getApoteker = async (req, res) => {
  try {
    const data = await Apoteker.findAll();
    return respon.success(res, "Succes get all apoteker", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const getApotekerById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Apoteker.findByPk(id);
    if (!data) {
      return respon.notFound(res, "Apoteker not found");
    }
    return respon.success(res, "Succes get apoteker by id", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const createApoteker = async (req, res) => {
  try {
    const newApoteker = await Apoteker.create(req.body);
    return respon.success(res, "Succes create apoteker", newApoteker);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const updateApoteker = async (req, res) => {
  try {
    const { id } = req.params;
    const apoteker = await Apoteker.findByPk(id);

    if (!apoteker) {
      return respon.notFound(res, "Apoteker not found");
    }
    await apoteker.update(req.body);
    return respon.success(res, "Succes update apoteker");
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

module.exports = {
  getApoteker,
  getApotekerById,
  createApoteker,
  updateApoteker,
};
