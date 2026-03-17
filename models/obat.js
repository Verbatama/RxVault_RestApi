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

      Obat.hasMany(models.Stok, {
        foreignKey: "obat_id",
        as: "stoks",
      });
      Obat.hasMany(models.MutasiStok, {
        foreignKey: "obat_id",
        as: "mutasiStoks",
      });

      Obat.belongsTo(models.BentukObat, {
        foreignKey: "bentuk_obat_id",
        as: "bentukObat",
      });

      Obat.belongsTo(models.GolonganObat, {
        foreignKey: "golongan_obat_id",
        as: "golonganObat",
      });

      Obat.belongsTo(models.BrandObat, {
        foreignKey: "brand_obat_id",
        as: "brandObat",
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
      dosis: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      satuan_dosis: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bentuk_obat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      golongan_obat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      kode_obat: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      brand_obat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bpom: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Obat",
    },
  );
  return Obat;
};
