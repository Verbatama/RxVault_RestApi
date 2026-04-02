'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SatuanDosis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bentuk_obat_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'BentukObats',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      nama_satuan_dosis: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint('SatuanDosis', {
      fields: ['bentuk_obat_id', 'nama_satuan_dosis'],
      type: 'unique',
      name: 'uniq_satuan_dosis_per_bentuk',
    });

    const [bentukRows] = await queryInterface.sequelize.query(
      'SELECT id, nama_bentuk_obat FROM BentukObats',
    );

    const unitMap = {
      tablet: ['mg', 'gram', 'mcg', 'tablet'],
      kapsul: ['mg', 'gram', 'mcg', 'kapsul'],
      sirup: ['ml'],
      injeksi: ['ml'],
      tetes: ['ml', 'tetes'],
      salep: ['gram'],
      krim: ['gram'],
      gel: ['gram'],
      suspensi: ['ml'],
      larutan: ['ml'],
      inhaler: ['puff'],
      suppositoria: ['suppositoria'],
    };

    const rowsToInsert = [];
    const seen = new Set();
    const lower = (value) => String(value || '').toLowerCase();

    for (const bentuk of bentukRows) {
      const units = unitMap[lower(bentuk.nama_bentuk_obat)] || ['mg', 'gram', 'ml'];
      for (const unit of units) {
        const key = `${bentuk.id}|${lower(unit)}`;
        if (seen.has(key)) {
          continue;
        }
        seen.add(key);
        rowsToInsert.push({
          bentuk_obat_id: bentuk.id,
          nama_satuan_dosis: unit,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    if (rowsToInsert.length > 0) {
      await queryInterface.bulkInsert('SatuanDosis', rowsToInsert, {});
    }

    await queryInterface.addColumn('ProdukObats', 'satuan_dosis_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'SatuanDosis',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    const [produkRows] = await queryInterface.sequelize.query(
      'SELECT id, bentuk_obat_id, satuan_dosis FROM ProdukObats',
    );
    const [satuanRows] = await queryInterface.sequelize.query(
      'SELECT id, bentuk_obat_id, nama_satuan_dosis FROM SatuanDosis',
    );

    const satuanLookup = new Map();
    for (const row of satuanRows) {
      satuanLookup.set(`${row.bentuk_obat_id}|${lower(row.nama_satuan_dosis)}`, row.id);
    }

    for (const produk of produkRows) {
      const key = `${produk.bentuk_obat_id}|${lower(produk.satuan_dosis)}`;
      const satuanId = satuanLookup.get(key);
      if (satuanId) {
        await queryInterface.sequelize.query(
          'UPDATE ProdukObats SET satuan_dosis_id = :satuanId WHERE id = :id',
          {
            replacements: { satuanId, id: produk.id },
          },
        );
      }
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('ProdukObats', 'satuan_dosis_id');
    await queryInterface.dropTable('SatuanDosis');
  },
};