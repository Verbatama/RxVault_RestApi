"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Spesialis",
      [
        {
          id: 1,
          nama_spesialis: "Dokter Umum",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          nama_spesialis: "Spesialis Anak (Sp.A)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          nama_spesialis: "Spesialis Penyakit Dalam (Sp.PD)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          nama_spesialis: "Spesialis Bedah (Sp.B)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          nama_spesialis: "Spesialis Kandungan (Sp.OG)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          nama_spesialis: "Spesialis Jantung (Sp.JP)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          nama_spesialis: "Spesialis Saraf (Sp.N)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          nama_spesialis: "Spesialis Kulit & Kelamin (Sp.KK)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 9,
          nama_spesialis: "Spesialis Mata (Sp.M)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 10,
          nama_spesialis: "Spesialis THT (Sp.THT)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Spesialis", null, {});
  },
};
