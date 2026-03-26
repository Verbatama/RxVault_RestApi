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
    await queryInterface.bulkInsert(
      "GolonganObats",
      [
        {
          nama_golongan_obat: "Analgesik",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_golongan_obat: "Antibiotik",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_golongan_obat: "Antipiretik",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_golongan_obat: "Antiinflamasi Nonsteroid (NSAID)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_golongan_obat: "Antihistamin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_golongan_obat: "Kortikosteroid",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("GolonganObats", null, {});
  },
};
