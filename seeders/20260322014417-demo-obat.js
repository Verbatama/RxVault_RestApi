"use strict";

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
    await queryInterface.bulkInsert("Obats", [
      {
        nama_obat: "Obat A",
        dosis: 250,
        satuan_dosis: "mg",
        bentuk_obat_id: 1,
        golongan_obat_id: 2,
        kode_obat: "OBAT122312",
        brand_obat_id: 1,
        bpom: "tess",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_obat: "Obat B",
        dosis: 250,
        satuan_dosis: "mg",
        bentuk_obat_id: 1,
        golongan_obat_id: 2,
        kode_obat: "OBAT122122",
        brand_obat_id: 2,
        bpom: "tesy",
        createdAt: new Date(),
        updatedAt: new Date(),
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
    await queryInterface.bulkDelete("Obats", null, {});
  },
};
