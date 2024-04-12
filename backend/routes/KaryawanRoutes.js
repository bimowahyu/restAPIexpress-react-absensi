import express from 'express';
const router = express.Router();
import { GetKaryawan, getKaryawanByid, createKaryawan, updateKaryawan, destroyKaryawan } from "../controllers/KaryawanController.js";
//import {} from "../middleware/AbsensiMiddleware.js"
import { AdminOnly } from '../middleware/AdminMiddleware.js'; 

// Routes untuk menampilkan daftar karyawan
router.get('/karyawan',AdminOnly ,GetKaryawan);
router.get('/karyawan/:id',AdminOnly ,getKaryawanByid);

// Routes untuk menambahkan karyawan baru
router.post('/karyawan',AdminOnly ,createKaryawan);

// Routes untuk memperbarui data karyawan
router.put('/karyawan/:id', updateKaryawan);

// Routes untuk menghapus karyawan
router.delete('/karyawan/:id',AdminOnly ,destroyKaryawan);

export default router;
