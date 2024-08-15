import Karyawan from '../models/Karyawan.js';
import Department from '../models/Department.js';
import Cabang from '../models/Cabang.js';
import Users from '../models/Users.js';
import argon2 from "argon2";
import { writeFile,unlink } from 'fs/promises';
import fs from 'fs'
import path from 'path';
import { v4 as uuidv4 } from 'uuid';


// Handler untuk menampilkan daftar karyawan
// export const GetKaryawan = async (req, res) => {
//     try {
//         let data = Karyawan.findAll();
//         include: [Department, Cabang] 
//         if (req.query.nama_lengkap) {
//             data = data.where('nama_lengkap', { [Op.iLike]: `%${req.query.nama_lengkap}%` });
//         }
//         if (req.query.department_id) {
//             // Pastikan department_id tidak undefined sebelum digunakan
//             if (req.query.department_id !== undefined) {
//                 data = data.where('department_id', req.query.department_id);
//             }
//         }
//         if (req.query.cabang_id) {
//             data = data.where('cabang_id', req.query.cabang_id);
//         }

//         const karyawan = await data;
//         const department = await Department.findAll();
//         const cabang = await Cabang.findAll();
        
//         res.status(200).json({ karyawan, department, cabang });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({msg:"Internal Server Error"});
//     }
// };
export const GetKaryawan = async (req, res) => {
    try {
        let data = await Karyawan.findAll({
            include: [Department, Cabang] // Include Department and Cabang models
        });

        if (req.query.nama_lengkap) {
            data = data.where('nama_lengkap', { [Op.iLike]: `%${req.query.nama_lengkap}%` });
        }
        if (req.query.department_id) {
            if (req.query.department_id !== undefined) {
                data = data.where('department_id', req.query.department_id);
            }
        }
        if (req.query.cabang_id) {
            data = data.where('cabang_id', req.query.cabang_id);
        }

        const karyawan = await data;
        
        res.status(200).json({ karyawan });
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:"Internal Server Error"});
    }
};
export const getKaryawanByid = async (req, res) => {
    try {
        const { id } = req.params; // Ambil ID karyawan dari parameter permintaan
        const karyawan = await Karyawan.findByPk(id); // Cari karyawan berdasarkan ID

        if (karyawan) {
            // Jika karyawan ditemukan, kirim respons dengan data karyawan
            res.status(200).json(karyawan);
        } else {
            // Jika karyawan tidak ditemukan, kirim respons dengan pesan bahwa karyawan tidak ditemukan
            res.status(404).json({ msg: "Karyawan tidak ditemukan" });
        }
    } catch (error) {
        // Tangani kesalahan jika terjadi
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }

}

export const createKaryawan = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: "No File Uploaded" });
    }

    const { nik, nama_lengkap, jabatan, DepartmentId, CabangId, no_telp, password } = req.body;
    const file = req.files.file;

    if (!file) {
        return res.status(400).json({ msg: "No File Uploaded" });
    }

    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = `${nama_lengkap}-${Date.now()}${ext}`;
     const url = `${req.protocol}://${req.get("host")}/uploads/karyawan/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Invalid Images" });
    }

    if (fileSize > 5000000) {
        return res.status(422).json({ msg: "Image must be less than 5 MB" });
    }

    file.mv(`./public/uploads/karyawan/${fileName}`, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ msg: "Failed to upload file" });
        }
        try {
            const hashedPassword = await argon2.hash(password);
            await Karyawan.create({
                nik,
                nama_lengkap,
                jabatan,
                DepartmentId,
                CabangId,
                no_telp,
                url:url,
                avatar: fileName,
                password: hashedPassword
            });
            res.status(201).json({ msg: "karyawan dibuat" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Failed to create karyawan" });
        }
    });
};
// Handler untuk menambahkan karyawan baru
// export const createKaryawan = async (req, res) => {
//     try {
//         console.log(req.body); // Tambahkan ini untuk memeriksa payload permintaan
//         const { nik, nama_lengkap, jabatan, DepartmentId, CabangId, no_telp, password } = req.body;

//         let avatar = '';
//         if (req.file) {
//             const extension = req.file.originalname.split('.').pop();
//             avatar = `${uuidv4()}.${extension}`;
//             await writeFile(`public/uploads/karyawan/${avatar}`, req.file.buffer);
//         }

//         const hashedPassword = await argon2.hash(password);

//         const createData = await Karyawan.create({
//             nik,
//             nama_lengkap,
//             jabatan,
//             DepartmentId,
//             CabangId,
//             no_telp,
//             avatar,
//             password: hashedPassword
//         });

//         if (createData) {
//             res.status(200).json(createData);
//         } else {
//             res.status(500).json({ msg: "Data Karyawan gagal ditambah, cek kembali"});
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({msg:"Internal Server Error"});
//     }
// };
// Handler untuk memperbarui data karyawan
// export const updateKaryawan = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { nik, nama_lengkap, jabatan, no_telp, password } = req.body;

//         // Mengambil informasi pengguna dari sesi
//         const userId = req.session.userId;
//         const user = await Users.findByPk(userId);

//         // Memeriksa apakah pengguna ditemukan
//         if (!user) {
//             return res.status(403).json({ msg: "Anda tidak memiliki izin untuk melakukan operasi ini" });
//         }

//         // Memeriksa apakah pengguna adalah admin
//         if (user.role === 'admin') {
//             // Izinkan admin untuk memperbarui karyawan
//         } else if (user.role === 'karyawan') {
//             // Izinkan karyawan untuk memperbarui informasi dirinya sendiri
//             if (user.id !== id) {
//                 return res.status(403).json({ msg: "Anda tidak memiliki izin untuk melakukan operasi ini" });
//             }
//         }

//         // Memeriksa apakah pengguna hanya mencoba memperbarui field yang diizinkan
//         const allowedFields = ['nik', 'nama_lengkap', 'jabatan', 'no_telp', 'password'];
//         const isInvalidUpdate = Object.keys(req.body).some(field => !allowedFields.includes(field));
//         if (isInvalidUpdate) {
//             return res.status(400).json({ msg: "Anda hanya dapat memperbarui nik, nama lengkap, jabatan, no_telp, dan password" });
//         }

//         // Memperbarui data karyawan
//         const updateData = await Karyawan.update({
//             nik,
//             nama_lengkap,
//             jabatan,
//             no_telp,
//             password
//         }, {
//             where: { id }
//         });

//         if (updateData) {
//             res.status(200).json({ msg: "Data Karyawan berhasil diupdate" });
//         } else {
//             res.status(500).json({ msg: "Data Karyawan gagal diupdate, cek kembali" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ msg: "Internal Server Error" });
//     }
// };

export const updateKaryawan = async (req, res) => {
    try {
        const { id } = req.params;
        const { nik, nama_lengkap, jabatan, 
            //DepartmentId, CabangId, 
            no_telp, password } = req.body;
        if(req.role === "admin"){

        }
        else{

        }

        let avatar = '';
        if (req.file) {
            const extension = req.file.originalname.split('.').pop();
            avatar = `${uuidv4()}.${extension}`;
            await writeFile(`public/uploads/karyawan/${avatar}`, req.file.buffer);
        }

        const hashedPassword = password ? await argon2.hash(password, 10) : undefined;

        const updateData = await Karyawan.update({
            nik,
            nama_lengkap,
            jabatan,
            // DepartmentId,
            // CabangId,
            no_telp,
            avatar: avatar || req.body.old_avatar,
            password: hashedPassword || req.body.old_password
        }, {
            where: { id }
        });

        if (updateData) {
            res.status(200).json({ msg: "Data Karyawan berhasil diupdate" });
        } else {
            res.status(500).json({ msg: "Data Karyawan gagal diupdate, cek kembali" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const destroyKaryawan = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Karyawan.findByPk(id);

        if (data && data.avatar) {
            const filePath = `public/uploads/karyawan/${data.avatar}`;
            try {
                await unlink(filePath);
                console.log('Avatar file deleted successfully');
            } catch (error) {
                console.error('Error deleting avatar file:', error);
                return res.status(500).json({ msg: 'Error deleting avatar file' });
            }
        }

        const deleteData = await Karyawan.destroy({
            where: { id }
        });

        if (deleteData) {
            res.status(200).json({ msg: 'Data Karyawan berhasil dihapus' });
        } else {
            res.status(500).json({ msg: 'Data Karyawan gagal dihapus, cek kembali' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

