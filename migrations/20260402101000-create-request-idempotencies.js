"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Menyimpan jejak request idempoten agar retry tidak memproses aksi ganda.
    await queryInterface.createTable("RequestIdempotencies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      endpoint: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idempotency_key: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      request_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      response_code: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      response_body: {
        type: Sequelize.JSON,
        allowNull: true,
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

    // Satu endpoint + idempotency key harus unik.
    await queryInterface.addIndex("RequestIdempotencies", ["endpoint", "idempotency_key"], {
      name: "uniq_idempotency_endpoint_key",
      unique: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex("RequestIdempotencies", "uniq_idempotency_endpoint_key");
    await queryInterface.dropTable("RequestIdempotencies");
  },
};
