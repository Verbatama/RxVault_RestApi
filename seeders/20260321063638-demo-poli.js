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
      "Polis",
      [
        {
          nama_poli: "Poli Umum",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_poli: "Poli Gigi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_poli: "Poli Anak",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_poli: "Poli Mata",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_poli: "Poli THT",
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
    await queryInterface.bulkDelete("Polis", null, {});
  },
};
