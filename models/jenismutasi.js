"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JenisMutasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      JenisMutasi.hasMany(models.MutasiStok, {
        foreignKey: "jenis_mutasi_id",
        as: "mutasiStoks",
      });
    }
  }
  JenisMutasi.init(
    {
      nama_jenis_mutasi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "JenisMutasi",
    },
  );
  return JenisMutasi;
};
