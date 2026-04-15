const { Apoteker } = require("../models");
const respon = require("../helpers/responseHelper");
const { signApotekerToken } = require("../helpers/apotekerTokenHelper");
const bcrypt = require("bcrypt");

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
    const data = await Apoteker.findByPk(newApoteker.id);
    return respon.success(res, "Succes create apoteker", data);
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
    const data = await Apoteker.findByPk(apoteker.id);
    return respon.success(res, "Succes update apoteker", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const loginApoteker = async (req, res) => {
  try {
    const namaApoteker = String(req.body.nama_apoteker || "").trim();
    const { password } = req.body;

    const apoteker = await Apoteker.scope("withPassword").findOne({
      where: {
        nama_apoteker: namaApoteker,
      },
    });

    if (!apoteker) {
      return respon.unauthorized(res, "Nama apoteker atau password salah");
    }

    const isPasswordValid = await bcrypt.compare(password, apoteker.password || "");

    if (!isPasswordValid) {
      return respon.unauthorized(res, "Nama apoteker atau password salah");
    }

    const token = signApotekerToken(apoteker);

    return respon.success(res, "Success login apoteker", {
      token,
      token_type: "Bearer",
      apoteker: {
        id: apoteker.id,
        nama_apoteker: apoteker.nama_apoteker,
      },
    });
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const getCurrentApoteker = async (req, res) => {
  try {
    if (!req.apoteker) {
      return respon.unauthorized(res, "Unauthorized");
    }

    return respon.success(res, "Success get current apoteker", req.apoteker);
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
  loginApoteker,
  getCurrentApoteker,
};
