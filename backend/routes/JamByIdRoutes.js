import express from 'express';
const router = express.Router();

import { setJamById, updateJamById, getJamByIdForKaryawan } from '../controllers/JamByIdController.js';

// Route untuk menetapkan jam kerja berdasarkan ID karyawan
router.post('/set', setJamById);

router.get('/get/jam', getJamByIdForKaryawan)

// Route untuk memperbarui jam kerja berdasarkan ID karyawan
router.post('/update', updateJamById);

export default router;
