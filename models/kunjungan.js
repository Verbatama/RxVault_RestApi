"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kunjungan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kunjungan.belongsTo(models.Pasien, {
        foreignKey: "pasien_id",
        as: "pasien",
      });

      Kunjungan.hasMany(models.Resep, {
        foreignKey: "kunjungan_id",
        as: "reseps",
      });

      Kunjungan.belongsTo(models.Poli, {
        foreignKey: "poli_id",
        as: "poli",
      });
    }
  }
  Kunjungan.init(
    {
      pasien_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      poli_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tanggal_kunjungan: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      no_registrasi: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      kode_registrasi: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      no_antrian: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Kunjungan",
    },
  );
  return Kunjungan;
};
