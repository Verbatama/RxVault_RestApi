"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class DispensingAuditLog extends Model {
    static associate(models) {
      DispensingAuditLog.belongsTo(models.Apoteker, {
        foreignKey: "apoteker_id",
        as: "apoteker",
      });
    }
  }

  DispensingAuditLog.init(
    {
      endpoint: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      action_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      no_registrasi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apoteker_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      processed_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      failed_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      response_message: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      metadata: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "DispensingAuditLog",
    },
  );

  return DispensingAuditLog;
};
