"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Stoks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      obat_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Obats",
          key: "id",
        },
      },
      nomor_batch: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jumlah_obat: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      expired_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      lokasi_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Lokasis",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Stoks");
  },
};
