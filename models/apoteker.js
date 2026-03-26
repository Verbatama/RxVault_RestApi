"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Apoteker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Apoteker.hasMany(models.Dispensing, {
        foreignKey: "apoteker_id",
        as: "dispensing",
      });
    }
  }
  Apoteker.init(
    {
      nama_apoteker: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Apoteker",
    },
  );
  return Apoteker;
};
