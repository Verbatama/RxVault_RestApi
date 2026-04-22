"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("ProdukObats");
    if (!table.min_stok_gudang) {
      await queryInterface.addColumn("ProdukObats", "min_stok_gudang", {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 20,
      });
    }
  },

  async down(queryInterface) {
    const table = await queryInterface.describeTable("ProdukObats");
    if (table.min_stok_gudang) {
      await queryInterface.removeColumn("ProdukObats", "min_stok_gudang");
    }
  },
};
