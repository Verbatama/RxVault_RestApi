const respon = require('../helpers/responseHelper');
const { Sequelize } = require('sequelize');
const { MutasiStok, Obat, Lokasi, JenisMutasi, Supplier } = require('../models');

const buildKeterangan = (log) => {
  const dari = String(log.dariLokasi?.nama_lokasi || '').toLowerCase();
  const ke = String(log.keLokasi?.nama_lokasi || '').toLowerCase();
  const jenis = String(log.jenisMutasi?.nama_jenis_mutasi || '').toLowerCase();

  if (jenis === 'penerimaan' && log.supplier?.nama_supplier) {
    return `${log.supplier.nama_supplier} ke gudang`;
  }
  if (dari === 'gudang' && ke === 'apotek') {
    return 'Gudang ke apotek';
  }
  if (dari === 'apotek' && ke === 'gudang') {
    return 'Apotek kembali ke gudang';
  }
  if (jenis === 'keluar' && dari === 'apotek') {
    return 'Pasien mengambil obat';
  }
  if (jenis === 'keluar' && dari === 'gudang') {
    return 'Ambil dari gudang (obat khusus)';
  }
  return 'Mutasi stok';
};

const getStockLog = async (req, res) => {
  try {
    const { year, month, day } = req.query;
    const andFilters = [];

    if (year) {
      andFilters.push(Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('tanggal_mutasi')), Number(year)));
    }
    if (month) {
      andFilters.push(Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('tanggal_mutasi')), Number(month)));
    }
    if (day) {
      andFilters.push(Sequelize.where(Sequelize.fn('DAY', Sequelize.col('tanggal_mutasi')), Number(day)));
    }

    const logs = await MutasiStok.findAll({
      where: andFilters.length > 0 ? { [Sequelize.Op.and]: andFilters } : undefined,
      include: [
        {
          model: Obat,
          as: 'obat',
          attributes: ['id', 'nama_obat'],
        },
        {
          model: Lokasi,
          as: 'dariLokasi',
          attributes: ['id', 'nama_lokasi'],
        },
        {
          model: Lokasi,
          as: 'keLokasi',
          attributes: ['id', 'nama_lokasi'],
        },
        {
          model: JenisMutasi,
          as: 'jenisMutasi',
          attributes: ['id', 'nama_jenis_mutasi'],
        },
        {
          model: Supplier,
          as: 'supplier',
          attributes: ['id', 'nama_supplier'],
          required: false,
        },
      ],
      order: [['tanggal_mutasi', 'DESC']],
      limit: 300,
    });

    const rows = logs.map((log) => ({
      id: log.id,
      tanggal_mutasi: log.tanggal_mutasi,
      nama_obat: log.obat?.nama_obat || '-',
      jumlah_obat: Number(log.jumlah_obat || 0),
      dari_lokasi: log.jenisMutasi?.nama_jenis_mutasi?.toLowerCase() === 'penerimaan' && log.supplier?.nama_supplier
        ? log.supplier.nama_supplier
        : log.dariLokasi?.nama_lokasi || '-',
      ke_lokasi: log.keLokasi?.nama_lokasi || '-',
      jenis_mutasi: log.jenisMutasi?.nama_jenis_mutasi || '-',
      supplier_nama: log.supplier?.nama_supplier || '-',
      keterangan: buildKeterangan(log),
    }));

    return respon.success(res, 'Success get stock log', rows);
  } catch (error) {
    console.error(error);
    return respon.serverError(res, error.message);
  }
}

module.exports = { getStockLog };
