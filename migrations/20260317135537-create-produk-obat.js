'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProdukObats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      obat_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Obats',
          key: 'id'
        },
      },
      brand: {
        type: Sequelize.STRING
      },
      bentuk_obat_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'BentukObats',
          key: 'id'
        },
      },
      dosis: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bpom: { 
        type: Sequelize.STRING, 
        allowNull: false, unique: true 
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProdukObats');
  }
};