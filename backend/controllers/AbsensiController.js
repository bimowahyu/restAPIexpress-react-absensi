import Absensi from "../models/Absensi.js";
import Karyawan from "../models/Karyawan.js";
import Cabang from "../models/Cabang.js";
import JamById from "../models/JamById.js";
import Jam from "../models/Jam.js";
import { writeFile } from 'fs/promises';
import { Op, where } from 'sequelize';
import dayjs from 'dayjs';
import { startOfDay, endOfDay } from 'date-fns';
import moment from 'moment-timezone';


import argon2 from "argon2";
import { Console } from "console";

const today = new Date();
const dayIndex = today.getDay();
const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const currentDay = daysOfWeek[dayIndex];

// dayjs.locale('id.js'); // Set locale ke Bahasa Indonesia
// dayjs.extend(require('dayjs/plugin/timezone.js')); // Load plugin timezone
export const getAbsensi = async (req, res) => {
    try {
        const hariIni = new Date().toISOString().slice(0, 10);
        const karyawanId = req.karyawan.id; // Menggunakan req.karyawan.id
        const karyawan = await Karyawan.findByPk(karyawanId); // Menggunakan await untuk mendapatkan karyawan berdasarkan ID

        if (!karyawan) {
            return res.status(404).json({ msg: "Karyawan tidak ditemukan" });
        }

        const absensiHariIni = await Absensi.findOne({ where: { karyawan_id: karyawanId, tgl_absensi: hariIni } });
        const cek = await Absensi.count({ where: { tgl_absensi: hariIni, karyawan_id: karyawanId } }); // Menggunakan karyawanId
        const lokasi = await Cabang.findByPk(karyawan.CabangId);
        const jamKerja = await JamById.findOne({ // Menggunakan findOne karena Anda hanya ingin mendapatkan satu data Jam
            where: { 
                hari: currentDay // Menggunakan dayjs untuk mendapatkan nama hari dalam Bahasa Indonesia
            } 
        });

        res.status(200).json({ cek, lokasi, jamKerja, absensiHariIni });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
export const getAbsensiBulanIni = async (req,res) =>{
    try {   
        const bulan = req.query.bulan;
        const tahun = req.query.tahun;
        const tanggalMulai = `${bulan}-${tahun}-01`;
        const tanggalSelesai = `${bulan}-${tahun}-30`;
        const absensiBulanan = await Absensi.findAndCountAll({
            where:{ karyawan_id : req.karyawan.id,
                tgl_absensi: {
                    [Op.between] : [tanggalMulai, tanggalSelesai]
                }
            }
        });
        const totalKehadiran =  absensiBulanan.count; 
        res.status(200).json({totalKehadiran});

    } catch (error) {
         console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

function convertToGMT7(dateString) {
    return moment.utc(dateString).tz('Asia/Jakarta').format(); // Mengubah ke zona waktu Asia/Jakarta (GMT+7)
}

// Fungsi untuk membuat objek absensi dengan waktu yang telah disesuaikan
function createAdjustedAbsensi(dataMasuk) {
    return {
        ...dataMasuk,
        createdAt: convertToGMT7(new Date()), // Mengonversi createdAt ke GMT+7
        updatedAt: convertToGMT7(new Date()) // Mengonversi updatedAt ke GMT+7
    };
}
export const CreateAbsensiKaryawan = async (req, res) => {
    try {
      
        const karyawan = req.karyawan;
        
        if (!karyawan) {
            return res.status(404).json({ msg: "Karyawan tidak ditemukan" });
        }
        
        const cabangId = karyawan.CabangId;

        if (!cabangId) {
            return res.status(400).json({ msg: "ID cabang tidak valid" });
        }
        
         const tglAbsensi = new Date().toISOString().slice(0, 10);
        //  const tglAbsensi = moment().tz('Asia/Jakarta').format('YYYY-MM-DD');
        //const tglAbsensi = dayjs().format('YYYY-MM-DD');
        // const tglAbsensi = req.body;


        // Periksa apakah sudah ada absensi masuk untuk karyawan pada hari yang sama
        const existingAbsensi = await Absensi.findOne({ where: { tgl_absensi: tglAbsensi, karyawan_id: karyawan.id } });

        if (existingAbsensi) {
            return res.status(400).send("Anda sudah melakukan absen masuk hari ini. Tunggu hingga tanggal berikutnya untuk melakukan absen masuk.");
        }

        const lokasiKantor = await Cabang.findOne({ where: { id: cabangId } });

        if (!lokasiKantor || !lokasiKantor.lokasi_kantor) {
            return res.status(404).json({ msg: "Lokasi kantor tidak ditemukan atau tidak valid" });
        }

        const latitudeUser = req.body.latitude;
        const longitudeUser = req.body.longitude;
        if (!latitudeUser || !longitudeUser) {
            return res.status(400).json({ msg: "Koordinat lokasi tidak valid" });
        }

        const [latitudeKantor, longitudeKantor] = lokasiKantor.lokasi_kantor.split(",");

        const jarak = distance(latitudeKantor, longitudeKantor, latitudeUser, longitudeUser);
        const radius = Math.round(jarak.meters);

        const lokasiMasuk = `${latitudeUser},${longitudeUser}`;

        const jamKerja = await JamById.findOne({ 
            where: { karyawan_id: karyawan.id },
            include: [{ model: Jam, as: 'jamDetail'}]
        });

        if (!jamKerja) {
            return res.status(400).send("Jam kerja tidak ditemukan");
        }

          const jam = new Date().toLocaleTimeString("en-US", { hour12: false });

        // const currentTime = new Date().toLocaleTimeString("en-US", { hour12: false });
        // if (currentTime < jamKerja.awal_jamMasuk || currentTime > jamKerja.akhir_jamMasuk) {
        //     return res.status(400).send("Maaf, belum waktunya melakukan absensi keluar atau Anda sudah melewati batas waktu absensi keluar");
        // }
        //const jam = moment().tz('Asia/Jakarta').format('HH:mm:ss');

        // Periksa apakah sudah waktunya melakukan absen masuk
        // if (jam < jamKerja.awal_jamMasuk || jam > jamKerja.akhir_jamMasuk) {
        //     return res.status(400).send("Maaf, belum waktunya melakukan absensi atau Anda sudah melewati batas waktu absensi");
        // }

        // Simpan data absensi masuk
        const formatName = `${karyawan.nik}-${tglAbsensi}-masuk`;
        const [imageType, imageData] = req.body.image.split(";base64,");
        const file = `public/uploads/absensi/${formatName}.png`;
        if (radius > lokasiKantor.radius) {
            return res.status(400).send(`Maaf, Anda berada di luar radius kantor. Jarak Anda ${radius} meter dari kantor`);
        }

        const dataMasuk = {
            karyawan_id: karyawan.id,
            jam_id: jamKerja.jam_id,
            tgl_absensi: tglAbsensi,
            jam_masuk: jam,
            foto_masuk: `${formatName}.png`,
            lokasi_masuk: lokasiMasuk,
            
        };

        // const simpan = await Absensi.create(dataMasuk);
        
        const adjustedDataMasuk = createAdjustedAbsensi(dataMasuk);

        const simpan = await Absensi.create(adjustedDataMasuk);
        if (simpan) {
            await writeFile(file, Buffer.from(imageData, 'base64'));
            return res.status(200).send("Absensi berhasil, Selamat bekerja");
        } else {
            return res.status(500).send("Error saat menyimpan data absensi");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// Untuk logika absen keluar
export const CreateAbsensiKaryawanKeluar = async (req, res) => {
    try {
        const karyawan = req.karyawan;

        if (!karyawan) {
            return res.status(404).json({ msg: "Karyawan tidak ditemukan" });
        }

        const cabangId = karyawan.CabangId;

        if (!cabangId) {
            return res.status(400).json({ msg: "ID cabang tidak valid" });
        }
        // Ambil tanggal hari ini
        // const tglAbsensi = moment().tz('Asia/Jakarta').format('YYYY-MM-DD');
        // const tglAbsensi = dayjs().format('YYYY-MM-DD');
        const tglAbsensi = new Date().toISOString().slice(0, 10);
        // Periksa apakah sudah ada absensi keluar untuk karyawan pada hari yang sama
        const existingAbsensi = await Absensi.findOne({ where: { tgl_absensi: tglAbsensi, karyawan_id: karyawan.id, jam_keluar: { [Op.ne]: null } } });

        if (existingAbsensi) {
            return res.status(400).send("Anda sudah melakukan absen keluar hari ini. Tunggu hingga tanggal berikutnya untuk melakukan absen masuk.");
        }
        // const tglAbsensi = req.body;
        const lokasiKantor = await Cabang.findOne({ where: { id: cabangId } });

        if (!lokasiKantor || !lokasiKantor.lokasi_kantor) {
            return res.status(404).json({ msg: "Lokasi kantor tidak ditemukan atau tidak valid" });
        }

        const latitudeUser = req.body.latitude;
        const longitudeUser = req.body.longitude;
        if (!latitudeUser || !longitudeUser) {
            return res.status(400).json({ msg: "Koordinat lokasi tidak valid" });
        }

        const [latitudeKantor, longitudeKantor] = lokasiKantor.lokasi_kantor.split(",");

        const jarak = distance(latitudeKantor, longitudeKantor, latitudeUser, longitudeUser);
        const radius = Math.round(jarak.meters);

        const lokasiKeluar = `${latitudeUser},${longitudeUser}`;

        // Periksa apakah sudah ada absen masuk untuk karyawan pada hari yang sama
        const absensiMasuk = await Absensi.findOne({ where: { tgl_absensi: tglAbsensi, karyawan_id: karyawan.id } });

        // Jika belum ada absensi masuk pada hari ini, kembalikan respons dengan pesan
        if (!absensiMasuk) {
            return res.status(400).send("Anda belum melakukan absen masuk hari ini");
        }

        // Lanjutkan dengan proses absen keluar
        const jamKerja = await JamById.findOne({ 
            where: { karyawan_id: karyawan.id },
            include: [{ model: Jam, as: 'jamDetail'}]
        });

        if (!jamKerja) {
            return res.status(400).send("Jam kerja tidak ditemukan");
        }

         const jam = new Date().toLocaleTimeString("en-US", { hour12: false });
      
        //  const currentTime = new Date().toLocaleTimeString("en-US", { hour12: false });
        //  if (currentTime < jamKerja.awal_jamKeluar || currentTime > jamKerja.set_jamPulang) {
        //      return res.status(400).send("Maaf, belum waktunya melakukan absensi keluar atau Anda sudah melewati batas waktu absensi keluar");
        //  }

       const formatName = `${karyawan.nik}-${tglAbsensi}-keluar`;
       const [imageType, imageData] = req.body.image.split(";base64,");
       const file = `public/uploads/absensi/${formatName}.png`;
       if (radius > lokasiKantor.radius) {
        return res.status(400).send(`Maaf, Anda berada di luar radius kantor. Jarak Anda ${radius} meter dari kantor`);
    }
        // Update absensi keluar
        
        const update = await Absensi.update({ 
            jam_keluar: jam,
            foto_keluar: `${formatName}.png`,
            lokasi_keluar: lokasiKeluar//`${req.body.latitude},${req.body.longitude}`
        }, { where: { tgl_absensi: tglAbsensi, karyawan_id: karyawan.id } });

        if (update[0] > 0) {
            // Jika berhasil melakukan update, juga perbarui jam keluar pada tabel Jam
            await writeFile(file, Buffer.from(imageData, 'base64'));
            await Jam.update({ jam_keluar: jam }, { where: { id: jamKerja.jamDetail.id } });
            return res.status(200).send("Absen keluar berhasil");
        } else {
            return res.status(500).send("Gagal melakukan absen keluar");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const edit = async (req, res) => {
    try {
        const karyawanId = req.user.id;
        const karyawan = await Karyawan.findByPk(karyawanId);
        res.status('200').json({ karyawan });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const updateKaryawan = async (req, res) => {
    try {
        const karyawan = req.user;
        const karyawanId = karyawan.id;
        const nik = karyawan.nik;
        const namaLengkap = req.body.nama_lengkap;
        const noTelp = req.body.no_telp;
        const password = req.body.password ? await argon2.hash(req.body.password, 10) : karyawan.password;
        const avatar = req.file ? `${nik}.${req.file.originalname.split('.').pop()}` : karyawan.avatar;

        const data = {
            nama_lengkap: namaLengkap,
            no_telp: noTelp,
            password: password,
            avatar: avatar
        };

        const update = await Karyawan.update(data, { where: { id: karyawanId } });
        if (update) {
            if (req.file) {
                const folderPath = "public/uploads/karyawan/";
                await req.file.mv(`${folderPath}${avatar}`);
            }
            res.status(200).json({msg:"Data Profile berhasil diupdate"});
        } else {
            res.status(404).json({msg: "Data profile gagal diupdate, cek kembali"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const distance = (lat1, lon1, lat2, lon2) => {
    const theta = lon1 - lon2;
    let miles = (Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2))) + (Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta)));
    miles = Math.acos(miles);
    miles = rad2deg(miles);
    miles = miles * 60 * 1.1515;
    const feet = miles * 5280;
    const yards = feet / 3;
    const kilometers = miles * 1.609344;
    const meters = kilometers * 1000;

    return { meters };
};

const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
};

const rad2deg = (rad) => {
    return rad * (180 / Math.PI);
};
