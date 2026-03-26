const { BentukObat } = require("../models");
const respon = require("../helpers/responseHelper");

const getBentukObat = async (req, res) => {
  try {
    const data = await BentukObat.findAll();
    return respon.success(res, "Success get all bentuk obat", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const getBentukObatById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await BentukObat.findByPk(id);

    if (!data) {
      return respon.notFound(res, "Bentuk obat not found");
    }
    return respon.success(res, "Success get bentuk obat by id", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const createBentukObat = async (req, res) => {
  try {
    const newBentukObat = await BentukObat.create(req.body);
    return respon.success(res, "Success create bentuk obat", newBentukObat);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const updateBentukObat = async (req, res) => {
  try {
    const { id } = req.params;
    const bentukObat = await BentukObat.findByPk(id);
    if (!bentukObat) {
      return respon.notFound(res, "Bentuk obat not found");
    }
    await bentukObat.update(req.body);
    return respon.success(res, "Success update bentuk obat", bentukObat);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

module.exports = {
  getBentukObat,
  getBentukObatById,
  createBentukObat,
  updateBentukObat,
};
