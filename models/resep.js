"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Resep extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Resep.belongsTo(models.Dokter, {
        foreignKey: "dokter_id",
        as: "dokter",
      });
      Resep.belongsTo(models.Kunjungan, {
        foreignKey: "kunjungan_id",
        as: "kunjungan",
      });
      Resep.hasMany(models.DetailResep, {
        foreignKey: "resep_id",
        as: "detailReseps",
      });
    }
  }
  Resep.init(
    {
      dokter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      kunjungan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tanggal: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Resep",
    },
  );
  return Resep;
};
