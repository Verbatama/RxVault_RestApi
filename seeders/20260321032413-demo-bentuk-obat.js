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
      "BentukObats",
      [
        {
          nama_bentuk_obat: "Tablet",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_bentuk_obat: "Kapsul",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_bentuk_obat: "Sirup",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_bentuk_obat: "Injeksi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_bentuk_obat: "Salep",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_bentuk_obat: "Suppositoria",
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
    await queryInterface.bulkDelete("BentukObats", null, {});
  },
};
