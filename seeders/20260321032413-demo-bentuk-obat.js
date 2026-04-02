"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "BentukObats",
      [
        {
          id: 1,
          nama_bentuk_obat: "Tablet",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          nama_bentuk_obat: "Kapsul",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          nama_bentuk_obat: "Sirup",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          nama_bentuk_obat: "Injeksi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          nama_bentuk_obat: "Salep",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          nama_bentuk_obat: "Suppositoria",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          nama_bentuk_obat: "Suspensi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          nama_bentuk_obat: "Tetes",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 9,
          nama_bentuk_obat: "Krim",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 10,
          nama_bentuk_obat: "Gel",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("BentukObats", null, {});
  },
};