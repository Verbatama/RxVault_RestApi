'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProdukObat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProdukObat.belongsTo(models.Obat, {
        foreignKey: "obat_id",
        as: "obat",
      });
      ProdukObat.belongsTo(models.BentukObat, {
        foreignKey: "bentuk_obat_id",
        as: "bentukObat",
      });
      ProdukObat.belongsTo(models.SatuanDosis, {
        foreignKey: "satuan_dosis_id",
        as: "satuanDosis",
      });
      ProdukObat.hasMany(models.Stok, {
        foreignKey: "produk_obat_id",
        as: "stokObats",
      });
       
    }
  }
  ProdukObat.init({
    obat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },

    bentuk_obat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    dosis: {
      type: DataTypes.INTEGER,
      allowNull: false,
     },
    satuan_dosis: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    satuan_dosis_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bpom: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    
  }, {
    sequelize,
    modelName: 'ProdukObat',
  });
  return ProdukObat;
};