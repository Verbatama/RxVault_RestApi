 'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('DetailReseps', [
      {
        resep_id: 1,
        obat_id: 1,
        jumlah: 2,
        aturan_pakai: "3x sehari setelah makan",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        resep_id: 1,
        obat_id: 2,
        jumlah: 1,
        aturan_pakai: "2x sehari sebelum tidur",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DetailReseps', null, {});
  }
};
