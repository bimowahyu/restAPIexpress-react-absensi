// Import model dan modul lain yang diperlukan
import Izin from "../models/Izin.js";
//import { Request, Response } from 'express';

// Handler untuk mendapatkan izin berdasarkan ID
export const getIzinById = async (req, res) => {
    try {
        const { id } = req.params;
        const izin = await Izin.findByPk(id);
        if (!izin) {
            return res.status(404).send("Izin tidak ditemukan");
        }
        res.json(izin);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// Handler untuk mendapatkan semua izin
export const getIzin = async (req, res) => {
    try {
        const izin = await Izin.findAll();
        res.json(izin);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// Handler untuk membuat izin baru
export const createIzin = async (req, res) => {
    try {
        // Ambil data dari request
        const { tgl_izin, status, keterangan } = req.body;
        const karyawanId = req.user.id;
        const nik = req.user.nik;

        // Persiapan data izin
        let foto = null;
        if (req.file) {
            foto = `${nik}.${tgl_izin}${req.file.originalname.split('.').pop()}`;
        }

        // Simpan data izin
        const izin = await Izin.create({
            karyawan_id: karyawanId,
            tgl_izin: tgl_izin,
            status: status,
            keterangan: keterangan,
            status_approved: "0",
            foto: foto
        });

        // Jika simpan berhasil
        if (izin) {
            // Simpan foto jika ada
            if (req.file) {
                const folderPath = "public/uploads/bukti/";
                await req.file.mv(`${folderPath}${foto}`);
            }
            return res.redirect('absensi/izin').with('success', 'Berhasil Mengajukan Izin/ Sakit');
        } else {
            return res.redirect('absensi/izin').with('error', "Gagal Mengajukan Izin/ Sakit, cek kembali");
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

        const izin = await Izin.findByPk(id);
        if (!izin) {
            return res.status(404).send("Izin tidak ditemukan");
        }

        const update = await izin.update({ status_approved: status_approved });
        if (update) {
            return res.redirect('back').with('success', 'Data Izin / Sakit berhasil di update');
        } else {
            return res.redirect('back').with('error', "Data Izin / Sakit gagal diupdate, cek kembali");
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
        const izin = await Izin.findByPk(id);
        if (!izin) {
            return res.status(404).send("Izin tidak ditemukan");
        }

        const deleted = await izin.destroy();
        if (deleted) {
            return res.redirect('back').with('success', 'Data Izin / Sakit berhasil dihapus');
        } else {
            return res.redirect('back').with('error', "Data Izin / Sakit gagal dihapus, cek kembali");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
