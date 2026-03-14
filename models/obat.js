"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Obat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Obat.hasMany(models.DetailResep, {
        foreignKey: "obat_id",
        as: "detailReseps",
      });
    }
  }
  Obat.init(
    {
      nama_obat: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "obat",
    },
  );
  return Obat;
};
