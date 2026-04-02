const { Pasien, Kunjungan, Resep, DetailResep, Obat, Dispensing, StatusDispensing } = require("../models");
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
const getPasienByNoReg = async (req, res) => {
  try {
    const { no_registrasi } = req.params;
    const kunjungan = await Kunjungan.findOne({
      where: {
        no_registrasi,
      },
      attributes: { exclude: ["createdAt", "updatedAt", "pasien_id", "poli_id"] },
      include: [
        {
          model: Pasien,
          as: "pasien",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Resep,
          as: "reseps",
          attributes: {exclude: ["createdAt", "updatedAt", "dokter_id", "kunjungan_id"]},
          include: [
            {
              model: DetailResep,
              as: "detailReseps",
              attributes: { exclude: ["createdAt", "updatedAt", "obat_id", "resep_id"] },
              include: [
                {
                  model: Obat,
                  as: "obat",
                  attributes: { exclude: ["createdAt", "updatedAt", "bentuk_obat_id", "golongan_obat_id", "brand_obat_id"]  },
                },
                {
                  model: Dispensing,
                  as: "dispensing",
                  attributes: { exclude: ["createdAt", "updatedAt", "status_dispensing_id", "apoteker_id"]  },
                  include: [
                    {
                      model: StatusDispensing,
                      as:"status",
                      attributes: { exclude: ["createdAt", "updatedAt"]}
                    }
                  ]

                }
              ],
            },
          ],
        },
      ],
    });
    if (!kunjungan) {
      return respon.notFound(res, "Pasien not found");
    }
    return respon.success(res, "Succes get pasien by no_reg", kunjungan);
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
  getPasienByNoReg,
  createPasien,
  updatePasien,
};
