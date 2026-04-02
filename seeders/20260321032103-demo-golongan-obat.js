"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "GolonganObats",
      [
        {
          id: 1,
          nama_golongan_obat: "Analgesik",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          nama_golongan_obat: "Antibiotik",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          nama_golongan_obat: "Antipiretik",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          nama_golongan_obat: "Antiinflamasi Nonsteroid (NSAID)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          nama_golongan_obat: "Antihistamin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          nama_golongan_obat: "Kortikosteroid",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          nama_golongan_obat: "Antasida",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          nama_golongan_obat: "Bronkodilator",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 9,
          nama_golongan_obat: "Antidiabetik",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 10,
          nama_golongan_obat: "Antihipertensi",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("GolonganObats", null, {});
  },
};