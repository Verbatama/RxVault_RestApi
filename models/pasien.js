"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pasien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pasien.hasMany(models.Kunjungan, {
        foreignKey: "pasien_id",
        as: "kunjungans",
      });
    }
  }
  Pasien.init(
    {
      nama_pasien: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jenis_kelamin: {
        type: DataTypes.ENUM("Laki-laki", "Perempuan"),
        allowNull: false,
      },

      umur: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      alamat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tanggal_lahir: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      no_rekam_medis: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Pasien",
    },
  );
  return Pasien;
};
