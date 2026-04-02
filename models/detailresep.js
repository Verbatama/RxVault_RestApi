"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DetailResep extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetailResep.belongsTo(models.Obat, {
        foreignKey: "obat_id",
        as: "obat",
      });
      DetailResep.belongsTo(models.Resep, {
        foreignKey: "resep_id",
        as: "resep",
      });
      DetailResep.hasMany(models.Dispensing, {
        foreignKey: "detail_resep_id",
        as:"dispensing"
      })
    }
  }
  DetailResep.init(
    {
      obat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      resep_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      aturan_pakai: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "DetailResep",
    },
  );
  return DetailResep;
};
