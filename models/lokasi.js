"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lokasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lokasi.hasMany(models.Stok, {
        foreignKey: "lokasi_id",
        as: "stoks",
      });
      Lokasi.hasMany(models.MutasiStok, {
        foreignKey: "dari_lokasi_id",
        as: "mutasiKeluar",
      });
      Lokasi.hasMany(models.MutasiStok, {
        foreignKey: "ke_lokasi_id",
        as: "mutasiMasuk",
      });
    }
  }
  Lokasi.init(
    {
      nama_lokasi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Lokasi",
    },
  );
  return Lokasi;
};
