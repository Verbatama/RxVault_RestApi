"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Poli extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Poli.hasMany(models.Kunjungan, {
        foreignKey: "poli_id",
        as: "kunjungans",
      });
    }
  }
  Poli.init(
    {
      nama_poli: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Poli",
    },
  );
  return Poli;
};
