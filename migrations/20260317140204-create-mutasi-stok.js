"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MutasiStoks", {
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
      dari_lokasi_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Lokasis",
          key: "id",
        },
      },
      ke_lokasi_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Lokasis",
          key: "id",
        },
      },
      jumlah_obat: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nomor_batch: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tanggal_mutasi: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      jenis_mutasi_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "JenisMutasis",
          key: "id",
        },
      },
      supplier_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Suppliers",
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
    await queryInterface.dropTable("MutasiStoks");
  },
};
