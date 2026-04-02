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
    await queryInterface.bulkInsert("StatusDispensings", [
      {
        nama_status: "Belum",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_status: "Sudah",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_status: "Pending",
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
    await queryInterface.bulkDelete("StatusDispensings", null, {});
  },
};
