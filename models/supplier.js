"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Supplier.hasMany(models.MutasiStok, {
        foreignKey: "supplier_id",
        as: "mutasiStoks",
      });
    }
  }
  Supplier.init(
    {
      nama_supplier: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kontak: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alamat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Supplier",
    },
  );
  return Supplier;
};
