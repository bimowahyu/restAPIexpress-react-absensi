import express from 'express';
const router = express.Router();

import { setJamById,addWorkDaysToEmployee ,updateJamById, getJamByIdForKaryawan } from '../controllers/JamByIdController.js';

// Route untuk menetapkan jam kerja berdasarkan ID karyawan
router.post('/set', setJamById);

router.post('/sethari', addWorkDaysToEmployee)

router.get('/get/jam', getJamByIdForKaryawan)

// Route untuk memperbarui jam kerja berdasarkan ID karyawan
router.put('/update/:id', updateJamById);

export default router;
