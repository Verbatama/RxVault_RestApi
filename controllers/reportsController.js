const respon = require('../helpers/responseHelper');
const { sequelize } = require('../models');

const getDailyUsage = async (req, res) => {
  try {
    const { date } = req.query;
    const targetDate = date || new Date().toISOString().slice(0, 10);

    const detailSql = `
      SELECT
        m.obat_id,
        o.nama_obat,
        SUM(CASE
          WHEN jm.nama_jenis_mutasi = 'Keluar' AND LOWER(dl.nama_lokasi) = 'apotek' THEN m.jumlah_obat
          ELSE 0
        END) AS pasien_mengambil_obat,
        SUM(CASE
          WHEN LOWER(dl.nama_lokasi) = 'gudang' AND LOWER(kl.nama_lokasi) = 'apotek' THEN m.jumlah_obat
          ELSE 0
        END) AS gudang_ke_apotek,
        SUM(CASE
          WHEN LOWER(dl.nama_lokasi) = 'apotek' AND LOWER(kl.nama_lokasi) = 'gudang' THEN m.jumlah_obat
          ELSE 0
        END) AS apotek_kembali_ke_gudang,
        SUM(CASE
          WHEN jm.nama_jenis_mutasi = 'Keluar' AND LOWER(dl.nama_lokasi) = 'gudang' THEN m.jumlah_obat
          ELSE 0
        END) AS ambil_dari_gudang_khusus
      FROM MutasiStoks m
      LEFT JOIN Obats o ON o.id = m.obat_id
      LEFT JOIN Lokasis dl ON dl.id = m.dari_lokasi_id
      LEFT JOIN Lokasis kl ON kl.id = m.ke_lokasi_id
      LEFT JOIN JenisMutasis jm ON jm.id = m.jenis_mutasi_id
      WHERE DATE(m.tanggal_mutasi) = :targetDate
      GROUP BY m.obat_id, o.nama_obat
      ORDER BY o.nama_obat ASC;
    `;

    const summarySql = `
      SELECT
        SUM(CASE
          WHEN jm.nama_jenis_mutasi = 'Keluar' AND LOWER(dl.nama_lokasi) = 'apotek' THEN m.jumlah_obat
          ELSE 0
        END) AS pasien_mengambil_obat,
        SUM(CASE
          WHEN LOWER(dl.nama_lokasi) = 'gudang' AND LOWER(kl.nama_lokasi) = 'apotek' THEN m.jumlah_obat
          ELSE 0
        END) AS gudang_ke_apotek,
        SUM(CASE
          WHEN LOWER(dl.nama_lokasi) = 'apotek' AND LOWER(kl.nama_lokasi) = 'gudang' THEN m.jumlah_obat
          ELSE 0
        END) AS apotek_kembali_ke_gudang,
        SUM(CASE
          WHEN jm.nama_jenis_mutasi = 'Keluar' AND LOWER(dl.nama_lokasi) = 'gudang' THEN m.jumlah_obat
          ELSE 0
        END) AS ambil_dari_gudang_khusus
      FROM MutasiStoks m
      LEFT JOIN Lokasis dl ON dl.id = m.dari_lokasi_id
      LEFT JOIN Lokasis kl ON kl.id = m.ke_lokasi_id
      LEFT JOIN JenisMutasis jm ON jm.id = m.jenis_mutasi_id
      WHERE DATE(m.tanggal_mutasi) = :targetDate;
    `;

    const [rows] = await sequelize.query(detailSql, { replacements: { targetDate } });
    const [summaryRows] = await sequelize.query(summarySql, { replacements: { targetDate } });
    const summary = summaryRows[0] || {};

    return respon.success(res, 'Success get daily usage', {
      date: targetDate,
      summary: {
        pasien_mengambil_obat: Number(summary.pasien_mengambil_obat || 0),
        gudang_ke_apotek: Number(summary.gudang_ke_apotek || 0),
        apotek_kembali_ke_gudang: Number(summary.apotek_kembali_ke_gudang || 0),
        ambil_dari_gudang_khusus: Number(summary.ambil_dari_gudang_khusus || 0),
      },
      rows: (rows || []).map((item) => ({
        obat_id: item.obat_id,
        nama_obat: item.nama_obat || '-',
        pasien_mengambil_obat: Number(item.pasien_mengambil_obat || 0),
        gudang_ke_apotek: Number(item.gudang_ke_apotek || 0),
        apotek_kembali_ke_gudang: Number(item.apotek_kembali_ke_gudang || 0),
        ambil_dari_gudang_khusus: Number(item.ambil_dari_gudang_khusus || 0),
      })),
    });
  } catch (error) {
    console.error(error);
    return respon.serverError(res, error.message);
  }
}

module.exports = { getDailyUsage };
