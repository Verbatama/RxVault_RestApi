"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Lokasis", [
      {
        nama_lokasi: "Apotek",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_lokasi: "Gudang",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Lokasis", null, {});
  },
};
