import Izin from "../models/Izin.js";
import Karyawan from "../models/Karyawan.js";
import Users from "../models/Users.js";

// Handler untuk membuat izin baru
export const createIzin = async (req, res) => {
    try {
        const { tgl_izin, status, keterangan, status_approved, foto, KaryawanId } = req.body;

        // Simpan data izin
        const izin = await Izin.create({
            tgl_izin,
            status,
            keterangan,
            status_approved,
            foto,
            KaryawanId
        });

        // Jika simpan berhasil
        if (izin) {
            return res.status(200).json({msg: 'Berhasil Mengajukan Izin'});
        } else {
            return res.status(201).json({msg: "Gagal Mengajukan Izin"});
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

        // Lakukan update status_approved
        const update = await izin.update({ status_approved });
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
