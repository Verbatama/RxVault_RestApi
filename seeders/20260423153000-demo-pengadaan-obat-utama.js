"use strict";

module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    const now = new Date();
    const namaSupplier = "Supplier Seed Obat Utama 2026";
    const pengadaanRows = [
      {
        namaObat: "Paracetamol",
        brand: "Paracetamol Seed Farma",
        dosis: 500,
        stokMasuk: 60,
        nomorBatch: "PGD-PRC-2026-001",
        bpom: "BPOM-PGD-PRC-2026-001",
        expiredDate: new Date("2028-12-31"),
      },
      {
        namaObat: "Ibuprofen",
        brand: "Ibuprofen Seed Farma",
        dosis: 400,
        stokMasuk: 45,
        nomorBatch: "PGD-IBU-2026-001",
        bpom: "BPOM-PGD-IBU-2026-001",
        expiredDate: new Date("2028-11-30"),
      },
      {
        namaObat: "Amoxicillin",
        brand: "Amoxicillin Seed Farma",
        dosis: 500,
        stokMasuk: 50,
        nomorBatch: "PGD-AMX-2026-001",
        bpom: "BPOM-PGD-AMX-2026-001",
        expiredDate: new Date("2028-10-31"),
      },
    ];

    try {
      const [[lokasiGudang]] = await queryInterface.sequelize.query(
        "SELECT id FROM Lokasis WHERE LOWER(nama_lokasi) = 'gudang' LIMIT 1",
        { transaction },
      );

      if (!lokasiGudang) {
        throw new Error("Lokasi Gudang tidak ditemukan");
      }

      const [[jenisPenerimaan]] = await queryInterface.sequelize.query(
        "SELECT id FROM JenisMutasis WHERE LOWER(nama_jenis_mutasi) = 'penerimaan' LIMIT 1",
        { transaction },
      );
      const jenisMutasiId = jenisPenerimaan ? Number(jenisPenerimaan.id) : 1;

      const [[bentukTablet]] = await queryInterface.sequelize.query(
        "SELECT id FROM BentukObats WHERE LOWER(nama_bentuk_obat) = 'tablet' LIMIT 1",
        { transaction },
      );
      if (!bentukTablet) {
        throw new Error("Bentuk obat Tablet tidak ditemukan");
      }

      const [[satuanMg]] = await queryInterface.sequelize.query(
        "SELECT id, nama_satuan_dosis FROM SatuanDosis WHERE bentuk_obat_id = :bentukObatId AND LOWER(nama_satuan_dosis) = 'mg' LIMIT 1",
        {
          replacements: { bentukObatId: Number(bentukTablet.id) },
          transaction,
        },
      );
      if (!satuanMg) {
        throw new Error("Satuan dosis mg untuk bentuk Tablet tidak ditemukan");
      }

      const [[supplierExisting]] = await queryInterface.sequelize.query(
        "SELECT id FROM Suppliers WHERE nama_supplier = :namaSupplier LIMIT 1",
        {
          replacements: { namaSupplier },
          transaction,
        },
      );

      let supplierId = supplierExisting ? Number(supplierExisting.id) : null;
      if (!supplierId) {
        await queryInterface.bulkInsert(
          "Suppliers",
          [
            {
              nama_supplier: namaSupplier,
              kontak: "021-55502600",
              alamat: "Jl. Seed Pengadaan Utama No. 26",
              createdAt: now,
              updatedAt: now,
            },
          ],
          { transaction },
        );

        const [[supplierInserted]] = await queryInterface.sequelize.query(
          "SELECT id FROM Suppliers WHERE nama_supplier = :namaSupplier LIMIT 1",
          {
            replacements: { namaSupplier },
            transaction,
          },
        );
        supplierId = supplierInserted ? Number(supplierInserted.id) : null;
      }

      if (!supplierId) {
        throw new Error("Gagal mendapatkan ID supplier seeder pengadaan");
      }

      for (const item of pengadaanRows) {
        const [[obatRow]] = await queryInterface.sequelize.query(
          "SELECT id FROM Obats WHERE LOWER(nama_obat) = LOWER(:namaObat) LIMIT 1",
          {
            replacements: { namaObat: item.namaObat },
            transaction,
          },
        );

        if (!obatRow) {
          throw new Error(`Obat ${item.namaObat} tidak ditemukan. Jalankan seeder obat terlebih dahulu.`);
        }

        const obatId = Number(obatRow.id);

        const [[produkByObat]] = await queryInterface.sequelize.query(
          "SELECT id FROM ProdukObats WHERE obat_id = :obatId ORDER BY id ASC LIMIT 1",
          {
            replacements: { obatId },
            transaction,
          },
        );

        let produkObatId = produkByObat ? Number(produkByObat.id) : null;

        if (!produkObatId) {
          await queryInterface.bulkInsert(
            "ProdukObats",
            [
              {
                obat_id: obatId,
                brand: item.brand,
                bentuk_obat_id: Number(bentukTablet.id),
                dosis: Number(item.dosis),
                satuan_dosis: String(satuanMg.nama_satuan_dosis || "mg"),
                satuan_dosis_id: Number(satuanMg.id),
                bpom: item.bpom,
                min_stok_gudang: 20,
                createdAt: now,
                updatedAt: now,
              },
            ],
            { transaction },
          );

          const [[produkInserted]] = await queryInterface.sequelize.query(
            "SELECT id FROM ProdukObats WHERE bpom = :bpom LIMIT 1",
            {
              replacements: { bpom: item.bpom },
              transaction,
            },
          );
          produkObatId = produkInserted ? Number(produkInserted.id) : null;
        }

        if (!produkObatId) {
          throw new Error(`Gagal mendapatkan produk obat untuk ${item.namaObat}`);
        }

        const [[stokExisting]] = await queryInterface.sequelize.query(
          "SELECT id FROM Stoks WHERE produk_obat_id = :produkObatId AND lokasi_id = :lokasiGudangId AND nomor_batch = :nomorBatch LIMIT 1",
          {
            replacements: {
              produkObatId,
              lokasiGudangId: Number(lokasiGudang.id),
              nomorBatch: item.nomorBatch,
            },
            transaction,
          },
        );

        if (!stokExisting) {
          await queryInterface.bulkInsert(
            "Stoks",
            [
              {
                produk_obat_id: produkObatId,
                lokasi_id: Number(lokasiGudang.id),
                nomor_batch: item.nomorBatch,
                jumlah_obat: Number(item.stokMasuk),
                expired_date: item.expiredDate,
                createdAt: now,
                updatedAt: now,
              },
            ],
            { transaction },
          );
        }

        const [[mutasiExisting]] = await queryInterface.sequelize.query(
          "SELECT id FROM MutasiStoks WHERE obat_id = :obatId AND nomor_batch = :nomorBatch LIMIT 1",
          {
            replacements: {
              obatId,
              nomorBatch: item.nomorBatch,
            },
            transaction,
          },
        );

        if (!mutasiExisting) {
          await queryInterface.bulkInsert(
            "MutasiStoks",
            [
              {
                obat_id: obatId,
                dari_lokasi_id: Number(lokasiGudang.id),
                ke_lokasi_id: Number(lokasiGudang.id),
                jumlah_obat: Number(item.stokMasuk),
                nomor_batch: item.nomorBatch,
                tanggal_mutasi: now,
                jenis_mutasi_id: jenisMutasiId,
                supplier_id: supplierId,
                createdAt: now,
                updatedAt: now,
              },
            ],
            { transaction },
          );
        }
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    const namaSupplier = "Supplier Seed Obat Utama 2026";
    const nomorBatches = ["PGD-PRC-2026-001", "PGD-IBU-2026-001", "PGD-AMX-2026-001"];
    const bpomList = ["BPOM-PGD-PRC-2026-001", "BPOM-PGD-IBU-2026-001", "BPOM-PGD-AMX-2026-001"];

    try {
      await queryInterface.bulkDelete(
        "MutasiStoks",
        {
          nomor_batch: nomorBatches,
        },
        { transaction },
      );

      await queryInterface.bulkDelete(
        "Stoks",
        {
          nomor_batch: nomorBatches,
        },
        { transaction },
      );

      await queryInterface.bulkDelete(
        "ProdukObats",
        {
          bpom: bpomList,
        },
        { transaction },
      );

      await queryInterface.bulkDelete(
        "Suppliers",
        {
          nama_supplier: namaSupplier,
        },
        { transaction },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
