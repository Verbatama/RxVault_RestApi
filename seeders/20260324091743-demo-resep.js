"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Reseps", [
      {
        id: 1,
        dokter_id: 1,
        kunjungan_id: 1,
        tanggal: new Date("2026-03-24"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reseps", null, {});
  },
};
