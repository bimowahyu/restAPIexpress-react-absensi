import express from 'express';
import { getCabangById, GetCabang, createCabang, updateCabang, destroyCabang } from '../controllers/CabangController.js';

const router = express.Router();

// Rute untuk menampilkan semua cabang
router.get('/cabang/:id', getCabangById);
router.get('/cabang', GetCabang);

// Rute untuk menambahkan cabang baru
router.post('/cabang', createCabang);

// Rute untuk memperbarui data cabang
router.put('/cabang/:id', updateCabang);

// Rute untuk menghapus cabang
router.delete('/cabang/:id', destroyCabang);

export default router;
