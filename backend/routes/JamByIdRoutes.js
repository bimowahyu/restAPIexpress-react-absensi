import express from 'express';

import { AdminOnly } from '../middleware/AdminMiddleware.js';
import { setJamById,addWorkDaysToEmployee ,updateJamById, getJamByIdForKaryawan } from '../controllers/JamByIdController.js';

const router = express.Router();
// Route untuk menetapkan jam kerja berdasarkan ID karyawan
router.post('/set', AdminOnly,setJamById);

router.post('/sethari', AdminOnly,addWorkDaysToEmployee)

router.get('/get/jam/:id', AdminOnly,getJamByIdForKaryawan)

// Route untuk memperbarui jam kerja berdasarkan ID karyawan
router.put('/update/:id', AdminOnly,updateJamById);

export default router;
