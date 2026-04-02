"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("ProdukObats", "satuan_dosis", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.sequelize.query(`
      UPDATE ProdukObats
      SET
        dosis = CASE
          WHEN dosis REGEXP '^[0-9]+$' THEN dosis
          ELSE REGEXP_REPLACE(dosis, '[^0-9]', '')
        END,
        satuan_dosis = CASE
          WHEN dosis LIKE '%mg%' THEN 'mg'
          WHEN dosis LIKE '%g%' THEN 'g'
          WHEN dosis LIKE '%mcg%' THEN 'mcg'
          WHEN dosis LIKE '%ml%' THEN 'ml'
          WHEN dosis LIKE '%tablet%' THEN 'tablet'
          WHEN dosis LIKE '%kapsul%' THEN 'kapsul'
          ELSE 'mg'
        END;
    `);

    await queryInterface.changeColumn("ProdukObats", "dosis", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });

    await queryInterface.changeColumn("ProdukObats", "satuan_dosis", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "mg",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("ProdukObats", "dosis", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.removeColumn("ProdukObats", "satuan_dosis");
  },
};
