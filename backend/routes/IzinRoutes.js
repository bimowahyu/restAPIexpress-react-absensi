import express from 'express';
import { getIzinById, getIzin, createIzin, updateIzin, deleteIzin } from '../controllers/IzinController.js';

const router = express.Router();

// Endpoint untuk mendapatkan izin berdasarkan ID
router.get('/izin/:id', getIzinById);

// Endpoint untuk mendapatkan semua izin
router.get('/izin', getIzin);

// Endpoint untuk membuat izin baru
router.post('/izin', createIzin);

// Endpoint untuk mengupdate izin
router.put('/izin/:id', updateIzin);

// Endpoint untuk menghapus izin
router.delete('/izin/:id', deleteIzin);

export default router;
