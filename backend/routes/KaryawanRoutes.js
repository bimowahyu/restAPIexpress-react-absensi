import express from 'express';
const router = express.Router();
import { GetKaryawan, getKaryawanByid, createKaryawan, updateKaryawan, destroyKaryawan } from "../controllers/KaryawanController.js";

// Routes untuk menampilkan daftar karyawan
router.get('/karyawan', GetKaryawan);
router.get('/karyawan/:id', getKaryawanByid);

// Routes untuk menambahkan karyawan baru
router.post('/karyawan', createKaryawan);

// Routes untuk memperbarui data karyawan
router.put('/karyawan/:id', updateKaryawan);

// Routes untuk menghapus karyawan
router.delete('/karyawan/:id', destroyKaryawan);

export default router;
