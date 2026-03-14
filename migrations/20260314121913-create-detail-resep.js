"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DetailReseps", {
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
      resep_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Reseps",
          key: "id",
        },
      },
      jumlah: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      aturan_pakai: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable("DetailReseps");
  },
};
