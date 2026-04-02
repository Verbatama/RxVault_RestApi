"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Dispensings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      detail_resep_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "DetailReseps",
          key: "id",
        },
      },
      apoteker_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Apotekers",
          key: "id",
        },
      },
      dispensingAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status_dispensing_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "StatusDispensings",
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
    await queryInterface.dropTable("Dispensings");
  },
};
