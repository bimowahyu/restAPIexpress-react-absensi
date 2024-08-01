import Karyawan from "../models/Karyawan.js";
import argon2 from "argon2";

export const LoginKaryawan = async (req, res) => {
    const { nik, password } = req.body;

    // Validasi apakah nik dan password ada dalam permintaan
    if (!nik || !password) {
        return res.status(400).json({ msg: "Nik dan password harus diisi." });
    }

    try {
        const karyawan = await Karyawan.findOne({
            where: {
                nik: nik
            }
        });

        if (!karyawan) {
            return res.status(404).json({ msg: "Karyawan tidak ditemukan" });
        }

        const match = await argon2.verify(karyawan.password, password);
        if (!match) {
            return res.status(400).json({ msg: "Password salah" });
        }

        
        req.session.karyawanId = karyawan.id;
        req.session.CabangId = karyawan.CabangId; // Tambahkan baris ini

        const responseData = {
            id: karyawan.id,
            nama_lengkap: karyawan.nama_lengkap,
            nik: karyawan.nik,
            jabatan: karyawan.jabatan,
            department: karyawan.DepartmentId,
            //cabang: karyawan.CabangId // Hapus baris ini
        };
        res.status(200).json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const MeKaryawan = async (req, res) => {
    if (!req.session.karyawanId) {
        return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }
    try {
        const karyawan = await Karyawan.findOne({
            attributes: ['id', 'nama_lengkap', 'nik','no_telp','avatar', 'jabatan', 'DepartmentId', 'CabangId'],
            where: {
                id: req.session.karyawanId
            }
        });
        if (!karyawan) {
            return res.status(404).json({ msg: "karyawan tidak ditemukan" });
        }
        res.status(200).json(karyawan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const logOutKaryawan = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"});
    });
};

