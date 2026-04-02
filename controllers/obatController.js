
const respon = require("../helpers/responseHelper");
const { Obat, GolonganObat } = require("../models");
const { Op } = require("sequelize");

const getObat = async (req, res) => {
  try {
    const data = await Obat.findAll({
      attributes: ["id", "nama_obat"],
      include: {
        model: GolonganObat,
        as: "golonganObat",
        attributes: ["id", "nama_golongan_obat"],
      }
    });
    return respon.success(res, "Success get all obat", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const getObatById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Obat.findByPk(id, {
      attributes: ["id", "nama_obat", "golongan_obat_id"],
      include: {
        model: GolonganObat,
        as: "golonganObat",
        attributes: ["id", "nama_golongan_obat"],
      },
    });
    if (!data) {
      return respon.notFound(res, "Obat not found");
    }
    return respon.success(res, "Success get obat by id", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const getObatBySearch = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return respon.badRequest(res, "Query is required");
    }
    const data = await Obat.findAll({
      where: {
        nama_obat: {
          [Op.like]: `%${q}%`,
        },
      },
      include: {
        model: GolonganObat,
        as: "golonganObat",
        attributes: ["id", "nama_golongan_obat"],
      },
    });
    return respon.success(res, "Success get obat by search", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const createObat = async (req, res) => {
  try {
    const { nama_obat, golongan_obat_id } = req.body;
    const newObat = await Obat.create({
      nama_obat,
      golongan_obat_id,
    });

    const data = await Obat.findByPk(newObat.id, {
      attributes: ["id", "nama_obat", "golongan_obat_id"],
      include: {
        model: GolonganObat,
        as: "golonganObat",
        attributes: ["id", "nama_golongan_obat"],
      },
    });

    return respon.success(res, "Success create obat", data);
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
module.exports = { getObat, getObatById, getObatBySearch, createObat, updateObat };
