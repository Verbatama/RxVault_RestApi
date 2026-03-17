"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BentukObat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BentukObat.hasMany(models.Obat, {
        foreignKey: "bentuk_obat_id",
        as: "obats",
      });
    }
  }
  BentukObat.init(
    {
      nama_bentuk_obat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "BentukObat",
    },
  );
  return BentukObat;
};
