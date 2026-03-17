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
      // define association here
      Stok.belongsTo(models.Obat, {
        foreignKey: "obat_id",
        as: "obat",
      });
    }
  }
  Stok.init(
    {
      obat_id: {
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
      lokasi_id: {
        type: DataTypes.INTEGER,
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
