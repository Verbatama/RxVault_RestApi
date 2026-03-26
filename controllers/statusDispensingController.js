const { StatusDispensing } = require("../models");
const respon = require("../helpers/responseHelper");

const getStatusDispensing = async (req, res) => {
  try {
    const data = await StatusDispensing.findAll();
    return respon.success(res, "Success get all status dispensing", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const getStatusDispensingById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await StatusDispensing.findByPk(id);
    if (!data) {
      return respon.notFound(res, "Status dispensing not found");
    }
    return respon.success(res, "Success get status dispensing by id", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const createStatusDispensing = async (req, res) => {
  try {
    const newStatusDispensing = await StatusDispensing.create(req.body);
    return respon.success(
      res,
      "Success create status dispensing",
      newStatusDispensing,
    );
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const updateStatusDispensing = async (req, res) => {
  try {
    const { id } = req.params;
    const statusDispensing = await StatusDispensing.findByPk(id);
    if (!statusDispensing) {
      return respon.notFound(res, "Status dispensing not found");
    }
    await statusDispensing.update(req.body);
    return respon.success(res, "Success update status dispensing ");
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

module.exports = {
  getStatusDispensing,
  getStatusDispensingById,
  createStatusDispensing,
  updateStatusDispensing,
};
