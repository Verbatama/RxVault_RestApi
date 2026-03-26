"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GolonganObat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GolonganObat.hasMany(models.Obat, {
        foreignKey: "golongan_obat_id",
        as: "obats",
      });
    }
  }
  GolonganObat.init(
    {
      nama_golongan_obat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "GolonganObat",
      //soft delete
      paranoid: true,
    },
  );
  return GolonganObat;
};
