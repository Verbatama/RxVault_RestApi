const { Pasien } = require("../models");
const respon = require("../helpers/responseHelper");

const getPasien = async (req, res) => {
  try {
    const data = await Pasien.findAll();
    return respon.success(res, "Success get all pasien", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const getPasienById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Pasien.findByPk(id);
    if (!data) {
      return respon.notFound(res, "Pasien not found");
    }
    return respon.success(res, "Success get pasien by id", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const createPasien = async (req, res) => {
  try {
    const newPasien = await Pasien.create(req.body);

    return respon.success(res, "Success create pasien", newPasien);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const updatePasien = async (req, res) => {
  try {
    const { id } = req.params;
    const pasien = await Pasien.findByPk(id);
    if (!pasien) {
      return respon.notFound(res, "Pasien not found");
    }
    await pasien.update(req.body);
    return respon.success(res, "Success update pasien", pasien);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

module.exports = {
  getPasien,
  getPasienById,
  createPasien,
  updatePasien,
};
