"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Apotekers", [
      {
        nama_apoteker: "Andi Saputra",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_apoteker: "Siti Rahmawati",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_apoteker: "Budi Santoso",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_apoteker: "Dewi Lestari",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_apoteker: "Rizky Pratama",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Apotekers", null, {});
  },
};
