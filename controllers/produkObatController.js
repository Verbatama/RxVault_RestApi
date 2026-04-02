const respon = require("../helpers/responseHelper");
const { ProdukObat, Stok, MutasiStok, Lokasi, Supplier, SatuanDosis, sequelize } = require("../models");

const createProdukObat = async (req, res) => {
    try {
        const {
            obat_id,
            brand,
            bentuk_obat_id,
            dosis,
            satuan_dosis_id,
            bpom,
            nama_supplier,
            alamat_supplier,
            kontak_supplier,
        } = req.body;

        const bpomValue = bpom || `BPOM-${Date.now()}`;

        const detailInput = Array.isArray(req.body.DetailStoks) ? req.body.DetailStoks : [];

        const allLokasi = await Lokasi.findAll();
        const gudang = allLokasi.find((item) => String(item.nama_lokasi).toLowerCase() === "gudang");

        if (!gudang) {
            return respon.notFound(res, "Lokasi Gudang belum tersedia");
        }

        const stokObatsPayload = detailInput.map((d) => ({
            lokasi_id: gudang.id,
            nomor_batch: d.nomor_batch,
            jumlah_obat: d.jumlah_obat,
            expired_date: d.tanggal_kadaluarsa || d.expired_date || null,
        }));

        const t = await sequelize.transaction();
        try {
            let supplier = await Supplier.findOne({
                where: {
                    nama_supplier,
                    alamat: alamat_supplier,
                    kontak: kontak_supplier,
                },
                transaction: t,
            });

            if (!supplier) {
                supplier = await Supplier.create(
                    {
                        nama_supplier,
                        alamat: alamat_supplier,
                        kontak: kontak_supplier,
                    },
                    { transaction: t },
                );
            }

            const newProdukObat = await ProdukObat.create(
                {
                    obat_id,
                    brand,
                    bentuk_obat_id,
                    dosis,
                    satuan_dosis_id,
                    bpom: bpomValue,
                    stokObats: stokObatsPayload,
                },
                {
                    include: [
                        { model: Stok, as: "stokObats" },
                        { model: SatuanDosis, as: "satuanDosis" },
                    ],
                    transaction: t,
                },
            );

            // create mutasi logs for each created stok (jenis_mutasi_id = 1 -> Penerimaan)
            for (const s of newProdukObat.stokObats || []) {
                await MutasiStok.create({
                    obat_id: newProdukObat.obat_id,
                    dari_lokasi_id: gudang.id,
                    ke_lokasi_id: gudang.id,
                    jumlah_obat: s.jumlah_obat,
                    nomor_batch: s.nomor_batch,
                    tanggal_mutasi: s.expired_date || new Date(),
                    jenis_mutasi_id: 1,
                    supplier_id: supplier.id,
                }, { transaction: t });
            }

            await t.commit();
            respon.success(res, "Pengadaan baru berhasil dibuat", {
                ...newProdukObat.toJSON(),
                supplier: {
                    id: supplier.id,
                    nama_supplier: supplier.nama_supplier,
                    alamat: supplier.alamat,
                    kontak: supplier.kontak,
                },
            });
        } catch (err) {
            await t.rollback();
            throw err;
        }
    } catch (error) {
        respon.serverError(res,  error.message);
    }
}

module.exports = {
    createProdukObat,
}