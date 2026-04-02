"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Kunjungans",
      [
        {
          id: 1,
          pasien_id: 1,
          poli_id: 1,
          tanggal_kunjungan: new Date(),
          no_registrasi: "REG-001",
          kode_registrasi: "KODE-001",
          no_antrian: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          pasien_id: 1,
          poli_id: 1,
          tanggal_kunjungan: new Date(),
          no_registrasi: "REG-002",
          kode_registrasi: "KODE-002",
          no_antrian: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Kunjungans", null, {});
  },
};
