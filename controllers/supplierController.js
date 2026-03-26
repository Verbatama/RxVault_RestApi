const { Supplier } = require("../models");
const respon = require("../helpers/responseHelper");

const getSupplier = async (req, res) => {
  try {
    const data = await Supplier.findAll();
    return respon.success(res, "Success get all supplier", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Supplier.findByPk(id);
    if (!data) {
      return respon.notFound(res, "Supplier not found");
    }
    return respon.success(res, "Success get supplier by id", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const createSupplier = async (req, res) => {
  try {
    const newSupplier = await Supplier.create(req.body);
    return respon.success(res, "Success create supplier", newSupplier);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findByPk(id);
    if (!supplier) {
      return respon.notFound(res, "Supplier not found");
    }
    await supplier.update(req.body);
    return respon.success(res, "Success update supplier", supplier);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

module.exports = {
  getSupplier,
  getSupplierById,
  createSupplier,
  updateSupplier,
};
