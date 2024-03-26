import Absensi from "../models/Absensi.js";
import Karyawan from "../models/Karyawan.js";
import Cabang from "../models/Cabang.js";
import JamById from "../models/JamById.js";
import Jam from "../models/Jam.js";
import { writeFile } from 'fs/promises';

import bcrypt from 'bcrypt';

export const getHari = () => {
    const hari = new Date().toLocaleDateString("en-US", { weekday: "short" });
    let namaHari = '';

    switch (hari) {
        case 'Sun':
            namaHari = "Minggu";
            break;
        case 'Mon':
            namaHari = "Senin";
            break;
        case 'Tue':
            namaHari = "Selasa";
            break;
        case 'Wed':
            namaHari = "Rabu";
            break;
        case 'Thu':
            namaHari = "Kamis";
            break;
        case 'Fri':
            namaHari = "Jumat";
            break;
        case 'Sat':
            namaHari = "Sabtu";
            break;
        default:
            namaHari = "Tidak Diketahui";
            break;
    }

    return namaHari;
};

export const getAbsensi = async (req, res) => {
    try {
        const hariIni = new Date().toISOString().slice(0, 10);
        const karyawanId = req.user.id;
        const karyawan = req.user;
        const absensiHariIni = await Absensi.findOne({ where: { karyawan_id: karyawanId, tgl_absensi: hariIni } });
        const cek = await Absensi.count({ where: { tgl_absensi: hariIni, karyawan_id: karyawan.id } });
        const lokasi = await Cabang.findByPk(karyawan.cabang_id);
        const jamKerja = await JamById.findOne({ 
            where: { karyawan_id: karyawan.id },
            include: [{ model: Jam, where: { hari: getHari() } }]
        });

        res.status(200).json({ cek, lokasi, jamKerja, absensiHariIni });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const CreateAbsensiKaryawan = async (req, res) => {
    try {
        const karyawan = req.user;
        const nik = karyawan.nik;
        const tglAbsensi = new Date().toISOString().slice(0, 10);
        const lokasiKantor = await Cabang.findByPk(karyawan.cabang_id);
        const [latitudeKantor, longitudeKantor] = lokasiKantor.lokasi_kantor.split(",");
        const [latitudeUser, longitudeUser] = req.body.lokasi.split(",");
        const jarak = distance(latitudeKantor, longitudeKantor, latitudeUser, longitudeUser);
        const radius = Math.round(jarak.meters);

        const namaHari = getHari();
        const jamKerja = await JamById.findOne({ 
            where: { karyawan_id: karyawan.id },
            include: [{ model: Jam, where: { hari: namaHari } }]
        });
        const jam = new Date().toLocaleTimeString("en-US", { hour12: false });

        const cek = await Absensi.count({ where: { tgl_absensi: tglAbsensi, karyawan_id: karyawan.id } });
        const ket = (cek > 0) ? "keluar" : "masuk";

        const image = req.body.image;
        const folderPath = "public/uploads/absensi/";
        const formatName = `${nik}-${tglAbsensi}-${ket}`;
        const [imageType, imageData] = image.split(";base64,");
        const file = `${folderPath}${formatName}.png`;

        if (radius > lokasiKantor.radius) {
            res.status(400).send(`Maaf, Anda berada di luar radius kantor. Jarak Anda ${radius} meter dari kantor`);
        } else {
            if (cek > 0) {
                if (jam < jamKerja.set_jamPulang) {
                    res.status(400).send("Maaf, belum waktunya pulang");
                } else {
                    const update = await Absensi.update({ 
                        jam_keluar: jam,
                        foto_keluar: `${formatName}.png`,
                        lokasi_keluar: req.body.lokasi
                    }, { where: { tgl_absensi: tglAbsensi, karyawan_id: karyawan.id } });

                    if (update) {
                        res.status(200).send("Terima Kasih, Hati-hati di jalan");
                        await writeFile(file, Buffer.from(imageData, 'base64'));
                    } else {
                        res.status(500).send("Error");
                    }
                }
            } else {
                if (jam < jamKerja.awal_jamMasuk) {
                    res.status(400).send("Maaf, belum waktunya melakukan absensi");
                } else if (jam > jamKerja.akhir_jamMasuk) {
                    res.status(400).send("Maaf, Anda sudah melewati batas waktu absensi");
                } else {
                    const dataMasuk = {
                        karyawan_id: karyawan.id,
                        jam_id: jamKerja.jam_id,
                        tgl_absensi: tglAbsensi,
                        jam_masuk: jam,
                        foto_masuk: `${formatName}.png`,
                        lokasi_masuk: req.body.lokasi
                    };
                    const simpan = await Absensi.create(dataMasuk);
                    if (simpan) {
                        res.status(200).send("Absensi berhasil, Selamat bekerja");
                        await writeFile(file, Buffer.from(imageData, 'base64'));
                    } else {
                        res.status(500).send("Error");
                    }
                }
            }
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
        const password = req.body.password ? await bcrypt.hash(req.body.password, 10) : karyawan.password;
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
