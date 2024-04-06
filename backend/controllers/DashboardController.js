import Absensi from '../models/Absensi.js';
import Izin from '../models/Izin.js';
import Karyawan from '../models/Karyawan.js';
import { Sequelize, fn, literal } from 'sequelize';
import moment from 'moment';

export const index = async (req, res) => {
    try {
        const hariIni = moment().format('YYYY-MM-DD');
        const bulanIni = moment().format('M');
        const tahunIni = moment().format('YYYY');
        const karyawanId = req.user.id;

        const absensiHariIni = await Absensi.findOne({ where: { karyawan_id: karyawanId, tgl_absensi: hariIni } });
        
        const absensiBulanIni = await Absensi.findAll({ 
            where: { 
                karyawan_id: karyawanId, 
                tgl_absensi: { [Sequelize.Op.like]: '%' + tahunIni + '-' + bulanIni + '%' } 
            },
            include: [{ model: Jams }],
            order: [['tgl_absensi', 'ASC']]
        });

        const rekapAbsensi = await Absensi.findOne({ 
            attributes: [
                [fn('COUNT', fn('DISTINCT', fn('karyawan_id'))), 'jmlHadir'],
                [fn('SUM', literal('IF(absensis.jam_masuk > akhir_jamMasuk,1,0)')), 'jmlTerlambat']
            ],
            include: [{ model: Jams }],
            where: { 
                karyawan_id: karyawanId, 
                tgl_absensi: { [Sequelize.Op.like]: '%' + tahunIni + '-' + bulanIni + '%' } 
            }
        });

        const leaderboard = await Absensi.findAll({
            where: { tgl_absensi: hariIni },
            include: [{ model: Karyawan }],
            order: [['jam_masuk', 'ASC']]
        });

        const rekapIzin_Sakit = await Izin.findOne({ 
            attributes: [
                [fn('SUM', literal('IF(status="i",1,0)')), 'jmlIzin'],
                [fn('SUM', literal('IF(status="s",1,0)')), 'jmlSakit']
            ],
            where: { 
                karyawan_id: karyawanId, 
                tgl_izin: { [Sequelize.Op.like]: '%' + tahunIni + '-' + bulanIni + '%' } 
            }
        });

        const namaBulan = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

        res.render('dashboard.dashboard', { 
            absensiHariIni, 
            absensiBulanIni, 
            bulanIni, 
            namaBulan, 
            tahunIni, 
            rekapAbsensi, 
            leaderboard, 
            rekapIzin_Sakit 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

//export { index };
