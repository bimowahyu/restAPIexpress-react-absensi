import express from 'express';
import { getHari, getAbsensi, CreateAbsensiKaryawan, edit, updateKaryawan } from '../controllers/AbsensiController.js';

const router = express.Router();

router.get('/absensi/create', getAbsensi);
router.post('/absensi/karyawan/create', CreateAbsensiKaryawan);
router.get('/absensi/:id/edit', edit);
router.get('/absensi/', getHari);
router.put('/absensi/:id', updateKaryawan);

export default router;


// routes/absensiRoutes.js
// import express from 'express';
// import { getHari, create, store, edit, update, history, getHistory, monitoring, getAbsensi, getMap, laporanAbsensi, cetakLaporan, rekapAbsensi, cetakRekap, lokasi } from "../controllers/AbsensiController.js";

// const router = express.Router();

// // Routes untuk Absensi
// router.get('/hari', getHari);
// router.get('/create', create);
// router.post('/store', store);
// router.get('/edit', edit);
// router.put('/update', update);
// router.get('/history', history);
// router.get('/getHistory', getHistory);
// router.get('/monitoring', monitoring);
// router.get('/getAbsensi', getAbsensi);
// router.get('/getMap', getMap);
// router.get('/laporanAbsensi', laporanAbsensi);
// router.get('/cetakLaporan', cetakLaporan);
// router.get('/rekapAbsensi', rekapAbsensi);
// router.get('/cetakRekap', cetakRekap);
// router.get('/lokasi', lokasi);

// export default router;
