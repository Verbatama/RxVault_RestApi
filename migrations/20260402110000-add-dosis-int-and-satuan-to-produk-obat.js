"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Tambah kolom satuan dosis agar nilai dosis terstruktur (angka + satuan).
    await queryInterface.addColumn("ProdukObats", "satuan_dosis", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Normalisasi data lama: ekstrak angka dosis dan turunkan satuan dari teks dosis.
    await queryInterface.sequelize.query(`
      UPDATE ProdukObats
      SET
        dosis = CASE
          WHEN dosis REGEXP '^[0-9]+$' THEN dosis
          ELSE REGEXP_REPLACE(dosis, '[^0-9]', '')
        END,
        satuan_dosis = CASE
          WHEN dosis LIKE '%mg%' THEN 'mg'
          WHEN dosis LIKE '%g%' THEN 'g'
          WHEN dosis LIKE '%mcg%' THEN 'mcg'
          WHEN dosis LIKE '%ml%' THEN 'ml'
          WHEN dosis LIKE '%tablet%' THEN 'tablet'
          WHEN dosis LIKE '%kapsul%' THEN 'kapsul'
          ELSE 'mg'
        END;
    `);

    // Dosis dibuat numerik supaya konsisten untuk perhitungan dan filter.
    await queryInterface.changeColumn("ProdukObats", "dosis", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });

    // Satuan dosis dibuat wajib isi dengan default mg.
    await queryInterface.changeColumn("ProdukObats", "satuan_dosis", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "mg",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("ProdukObats", "dosis", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.removeColumn("ProdukObats", "satuan_dosis");
  },
};
