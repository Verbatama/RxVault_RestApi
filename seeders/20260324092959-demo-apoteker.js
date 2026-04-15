"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const defaultPasswordHash = await bcrypt.hash("apoteker123", 10);

    await queryInterface.bulkInsert("Apotekers", [
      {
        nama_apoteker: "Andi Saputra",
        password: defaultPasswordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_apoteker: "Siti Rahmawati",
        password: defaultPasswordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_apoteker: "Budi Santoso",
        password: defaultPasswordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_apoteker: "Dewi Lestari",
        password: defaultPasswordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_apoteker: "Rizky Pratama",
        password: defaultPasswordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Apotekers", null, {});
  },
};
