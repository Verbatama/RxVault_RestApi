'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SatuanDosis extends Model {
    static associate(models) {
      SatuanDosis.belongsTo(models.BentukObat, {
        foreignKey: 'bentuk_obat_id',
        as: 'bentukObat',
      });

      SatuanDosis.hasMany(models.ProdukObat, {
        foreignKey: 'satuan_dosis_id',
        as: 'produkObats',
      });
    }
  }

  SatuanDosis.init(
    {
      bentuk_obat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nama_satuan_dosis: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'SatuanDosis',
      tableName: 'SatuanDosis',
    },
  );

  return SatuanDosis;
};