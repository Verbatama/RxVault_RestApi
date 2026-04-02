const respon = require('../helpers/responseHelper');
const { SatuanDosis } = require('../models');

const getSatuanDosis = async (req, res) => {
  try {
    const { bentuk_obat_id } = req.query;

    const where = bentuk_obat_id && Number.isFinite(Number(bentuk_obat_id))
      ? { bentuk_obat_id: Number(bentuk_obat_id) }
      : undefined;

    const data = await SatuanDosis.findAll({
      where,
      order: [['nama_satuan_dosis', 'ASC']],
    });

    return respon.success(res, 'Success get all satuan dosis', data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

module.exports = {
  getSatuanDosis,
};