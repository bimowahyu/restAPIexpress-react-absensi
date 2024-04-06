import Karyawan from "../models/Karyawan.js"; // Pastikan menggunakan huruf kapital di "Karyawan"
//import argon2 from "argon2";

export const authKaryawan = async (req, res, next) => {
    // Periksa apakah sesi karyawanId ada
    if (!req.session.karyawanId) {
        return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }

    try {
        // Cari karyawan berdasarkan id yang disimpan dalam sesi
        const karyawan = await Karyawan.findByPk(req.session.karyawanId, {
            attributes: ['id', 'nama_lengkap', 'nik', 'jabatan', 'DepartmentId', 'CabangId'] // Attribut yang ingin ditampilkan
        });

        // Jika karyawan tidak ditemukan
        if (!karyawan) {
            return res.status(404).json({ msg: "Karyawan tidak ditemukan" });
        }

        // Jika karyawan ditemukan, lanjutkan ke middleware berikutnya
        req.karyawan = karyawan; // Menyimpan data karyawan dalam objek req untuk digunakan di rute berikutnya
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const logOutKaryawan = (req, res) => {
    // Hapus sesi karyawanId
    req.session.destroy((err) => {
        if (err) {
            return res.status(400).json({ msg: "Tidak dapat logout" });
        }
        res.status(200).json({ msg: "Anda telah logout" });
    });
};
