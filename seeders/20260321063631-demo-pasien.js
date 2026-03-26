"use strict";

const { date } = require("zod");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Pasiens", [
      {
        nama_pasien: "Kusnain",
        umur: 56,
        jenis_kelamin: "Laki-laki",
        alamat: "JL Medan Merdeka no 55",
        tanggal_lahir: new Date("1987-6-8"),
        no_rekam_medis: "1111/tes/nomor rekam medis",
        updatedAT: new Date(),
        createdAT: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Pasiens", null, {});
  },
};
