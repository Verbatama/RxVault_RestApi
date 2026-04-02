"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Obats", [
      {
        id: 1,
        nama_obat: "Paracetamol",
        golongan_obat_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        nama_obat: "Amoxicillin",
        golongan_obat_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        nama_obat: "Ibuprofen",
        golongan_obat_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        nama_obat: "Cefadroxil",
        golongan_obat_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        nama_obat: "CTM",
        golongan_obat_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        nama_obat: "Antasida",
        golongan_obat_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        nama_obat: "Omeprazole",
        golongan_obat_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        nama_obat: "Salbutamol",
        golongan_obat_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        nama_obat: "Metformin",
        golongan_obat_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        nama_obat: "Amlodipine",
        golongan_obat_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Obats", null, {});
  },
};