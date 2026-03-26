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
      "BrandObats",
      [
        {
          nama_brand_obat: "Vitarin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_brand_obat: "Mediflex",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_brand_obat: "Paracure",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_brand_obat: "Curemax",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_brand_obat: "Healix",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nama_brand_obat: "Remedix",
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
    await queryInterface.bulkDelete("BrandObats", null, {});
  },
};
