import express from 'express';
import { getAll, createJam, updateJam,destroy ,set,GetJamById }from '../controllers/JamController.js';

const router = express.Router();

// Route untuk menampilkan semua jam kerja
router.get('/admin/jamKerja', getAll);

router.get('/admin/jamKerja/:id', GetJamById);

// Route untuk menambahkan jam kerja baru
router.post('/admin/jamKerja', createJam);

// Route untuk memperbarui data jam kerja
router.put('/admin/jamKerja/:id', updateJam);

// Route untuk menghapus jam kerja
router.delete('/admin/jamKerja/:id', destroy);

// Route untuk menetapkan jam kerja berdasarkan ID karyawan
router.get('/admin/setJamKerja/:id', set);

export default router;
