"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stok extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Stok belongs to ProdukObat via produk_obat_id
      Stok.belongsTo(models.ProdukObat, {
        foreignKey: "produk_obat_id",
        as: "produkObat",
      });

      Stok.belongsTo(models.Lokasi, {
        foreignKey: "lokasi_id",
        as: "lokasi",
      });
    }
  }
  Stok.init(
    {
      produk_obat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lokasi_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nomor_batch: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jumlah_obat: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      expired_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Stok",
    },
  );
  return Stok;
};
