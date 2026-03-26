"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Kunjungans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pasien_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Pasiens",
          key: "id",
        },
      },
      poli_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Polis",
          key: "id",
        },
      },
      tanggal_kunjungan: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      no_registrasi: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      kode_registrasi: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      no_antrian: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Kunjungans");
  },
};
