"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DispensingAuditLogs", {
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
      action_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      no_registrasi: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apoteker_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      idempotency_key: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      processed_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      failed_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      response_message: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      metadata: {
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

    await queryInterface.addIndex("DispensingAuditLogs", ["no_registrasi", "createdAt"], {
      name: "idx_disp_audit_no_reg_created",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex("DispensingAuditLogs", "idx_disp_audit_no_reg_created");
    await queryInterface.dropTable("DispensingAuditLogs");
  },
};
