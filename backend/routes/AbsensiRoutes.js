import express from 'express';
import { 
    getAbsensiTotal,
    getAbsensiBulanIni, 
   getAbsensi, 
   CreateAbsensiKaryawan,
   CreateAbsensiKaryawanKeluar, 
    edit, 
   updateKaryawan 
} from '../controllers/AbsensiController.js';
import { authKaryawan } from "../middleware/AbsensiMiddleware.js" 
import { AdminOnly } from '../middleware/AdminMiddleware.js';

const router = express.Router();

router.get('/absensitotal/get', AdminOnly, getAbsensiTotal);
router.get('/absensibulanini/get',AdminOnly, getAbsensiBulanIni);
router.get('/absensi/get', authKaryawan, getAbsensi);
router.put('/absensi/karyawan/keluar', authKaryawan ,CreateAbsensiKaryawanKeluar);
router.post('/absensi/karyawan/create', authKaryawan ,CreateAbsensiKaryawan);
router.post('/absensi/karyawan/keluar', authKaryawan ,CreateAbsensiKaryawan);
router.get('/absensi/:id/edit',AdminOnly, edit);
//router.get('/absensi/', getHari);
router.put('/absensi/:id', updateKaryawan);

export default router;


