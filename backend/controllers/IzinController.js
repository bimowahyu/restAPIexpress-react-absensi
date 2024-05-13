import Izin from "../models/Izin.js";
import Karyawan from "../models/Karyawan.js";
import Users from "../models/Users.js";

// Handler untuk membuat izin baru
export const createIzin = async (req, res) => {
    try {
        const { tgl_izin, keterangan, foto } = req.body;

        // Dapatkan karyawan dari data request
        const karyawan = req.karyawan;

        // Simpan data izin
        const izin = await Izin.create({
            tgl_izin,
            status: 'Izin', // Set status awal izin menjadi 'Diajukan'
            keterangan,
            status_approved: 'Pending', // Set status_approved awal izin menjadi 'Belum'
            foto,
            KaryawanId: karyawan.id, // Tautkan izin dengan karyawan yang membuat izin
        });

        // Jika izin berhasil disimpan
        if (izin) {
            return res.status(200).json({ msg: 'Berhasil Mengajukan Izin', izin });
        } else {
            return res.status(500).json({ msg: "Gagal Mengajukan Izin" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
// Handler untuk mengupdate izin
export const updateIzin = async (req, res) => {
    try {
        const { id } = req.params;
        const { status_approved } = req.body;

        // Cari izin berdasarkan ID
        const izin = await Izin.findByPk(id);
        if (!izin) {
            return res.status(404).send("Izin tidak ditemukan");
        }

        // Konversi nilai status_approved
        let approvedStatus;
        if (status_approved === "1") {
            approvedStatus = "Disetujui";
        } else if (status_approved === "2") {
            approvedStatus = "Ditolak";
        } else {
            return res.status(400).json({ msg: "Nilai status_approved tidak valid" });
        }

        // Lakukan update status_approved
        const update = await izin.update({ status_approved: approvedStatus });
        if (update) {
            return res.status(200).json({msg: "Data izin berhasil diupdate"});
        } else {
            return res.status(500).json({msg: "Gagal mengupdate data izin"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// Handler untuk menghapus izin
export const deleteIzin = async (req, res) => {
    try {
        const { id } = req.params;

        // Cari izin berdasarkan ID
        const izin = await Izin.findByPk(id);
        if (!izin) {
            return res.status(404).send("Izin tidak ditemukan");
        }

        // Hapus izin
        const deleted = await izin.destroy();
        if (deleted) {
            return res.status(200).json({msg: 'Data izin berhasil dihapus'});
        } else {
            return res.status(500).json({msg: "Gagal menghapus data izin"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
