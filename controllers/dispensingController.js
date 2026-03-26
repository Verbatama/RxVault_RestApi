const respon = require("../helpers/responseHelper");
const { Dispensing } = require("../models");

const getDispensing = async (req, res) => {
  try {
    const data = await Dispensing.findAll();
    return respon.success(res, "Success get all dispensing", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const getDispensingById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Dispensing.findByPk(id);

    if (!data) {
      return respon.notFound(res, "Dispensing not found");
    }
    return respon.success(res, "Success get dispensing by id", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const createDispensing = async (req, res) => {
  try {
    const newDispensing = await Dispensing.create(req.body);
    return respon.success(res, "Success create dispensing", newDispensing);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const updateDispensing = async (req, res) => {
  try {
    const { id } = req.params;
    const dispensing = await Dispensing.findByPk(id);

    if (!dispensing) {
      return respon.notFound(res, "Dispensing not found");
    }

    await dispensing.update(req.body);
    return respon.success(res, "Success update dispensing", dispensing);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

module.exports = {
  getDispensing,
  getDispensingById,
  createDispensing,
  updateDispensing,
};
