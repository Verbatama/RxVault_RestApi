const { z } = require("zod");
const { BrandObat } = require("../models");
const respon = require("../helpers/responseHelper");

const getBrandObat = async (req, res) => {
  try {
    const data = await BrandObat.findAll();
    return respon.success(res, "Success get all brand obat", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const getBrandObatById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await BrandObat.findByPk(id);

    if (!data) {
      return respon.notFound(res, "Brand obat not found");
    }
    return respon.success(res, "Succes get brand obat by id", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const createBrandObat = async (req, res) => {
  try {
    const newBrandObat = await BrandObat.create(req.body);
    return respon.success(res, "Succes created brand obat", newBrandObat);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const updateBrandObat = async (req, res) => {
  try {
    const { id } = req.params;
    const brandObat = await BrandObat.findByPk(id);

    if (!brandObat) {
      return respon.notFound(res, "Brand obat not found");
    }

    await brandObat.update(req.body);
    return respon.success(res, "Succes created brand obat", brandObat);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

module.exports = {
  getBrandObat,
  getBrandObatById,
  createBrandObat,
  updateBrandObat,
};
