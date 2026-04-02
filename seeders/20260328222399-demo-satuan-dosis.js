"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const rows = [
      [1, "mg"],
      [1, "gram"],
      [1, "mcg"],
      [1, "tablet"],
      [2, "mg"],
      [2, "gram"],
      [2, "mcg"],
      [2, "kapsul"],
      [3, "ml"],
      [4, "ml"],
      [5, "gram"],
      [6, "suppositoria"],
      [7, "ml"],
      [8, "ml"],
      [8, "tetes"],
      [9, "gram"],
      [10, "gram"],
    ];

    const uniqueRows = [];
    const seen = new Set();

    for (const [bentukObatId, namaSatuanDosis] of rows) {
      const key = `${bentukObatId}|${namaSatuanDosis.toLowerCase()}`;
      if (seen.has(key)) {
        continue;
      }
      seen.add(key);
      uniqueRows.push({
        bentuk_obat_id: bentukObatId,
        nama_satuan_dosis: namaSatuanDosis,
        createdAt: now,
        updatedAt: now,
      });
    }

    await queryInterface.bulkInsert("SatuanDosis", uniqueRows, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("SatuanDosis", null, {});
  },
};