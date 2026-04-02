'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('JenisMutasis', [
      { id: 1, nama_jenis_mutasi: 'Penerimaan', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, nama_jenis_mutasi: 'Keluar', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, nama_jenis_mutasi: 'Transfer', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('JenisMutasis', null, {});
  }
};
