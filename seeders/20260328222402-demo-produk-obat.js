'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ProdukObats', [
      {
        id: 1,
        obat_id: 1,
        brand: 'Paracetamol Kimia Farma',
        bentuk_obat_id: 1,
        dosis: 500,
        satuan_dosis_id: 1,
        bpom: 'BPOM-PROD-0001',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        obat_id: 2,
        brand: 'Amoxicillin Dexa',
        bentuk_obat_id: 2,
        dosis: 250,
        satuan_dosis_id: 5,
        bpom: 'BPOM-PROD-0002',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        obat_id: 3,
        brand: 'Ibuprofen Proris',
        bentuk_obat_id: 1,
        dosis: 200,
        satuan_dosis_id: 1,
        bpom: 'BPOM-PROD-0003',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        obat_id: 4,
        brand: 'Cefadroxil Sanbe',
        bentuk_obat_id: 2,
        dosis: 500,
        satuan_dosis_id: 5,
        bpom: 'BPOM-PROD-0004',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        obat_id: 5,
        brand: 'CTM Generik',
        bentuk_obat_id: 1,
        dosis: 4,
        satuan_dosis_id: 1,
        bpom: 'BPOM-PROD-0005',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        obat_id: 6,
        brand: 'Antasida Doen',
        bentuk_obat_id: 3,
        dosis: 5,
        satuan_dosis_id: 9,
        bpom: 'BPOM-PROD-0006',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        obat_id: 7,
        brand: 'Omeprazole Hexpharm',
        bentuk_obat_id: 2,
        dosis: 20,
        satuan_dosis_id: 5,
        bpom: 'BPOM-PROD-0007',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        obat_id: 8,
        brand: 'Salbutamol Combivent',
        bentuk_obat_id: 4,
        dosis: 2,
        satuan_dosis_id: 10,
        bpom: 'BPOM-PROD-0008',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        obat_id: 9,
        brand: 'Metformin Novell',
        bentuk_obat_id: 1,
        dosis: 500,
        satuan_dosis_id: 1,
        bpom: 'BPOM-PROD-0009',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        obat_id: 10,
        brand: 'Amlodipine Kalbe',
        bentuk_obat_id: 1,
        dosis: 10,
        satuan_dosis_id: 1,
        bpom: 'BPOM-PROD-0010',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProdukObats', null, {});
  }
};