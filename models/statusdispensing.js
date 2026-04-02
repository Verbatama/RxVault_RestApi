"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StatusDispensing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StatusDispensing.hasMany(models.Dispensing, {
        foreignKey: "status_dispensing_id",
        as: "dispensings",
      });
    }
  }
  StatusDispensing.init(
    {
      nama_status: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "StatusDispensing",
    },
  );
  return StatusDispensing;
};
