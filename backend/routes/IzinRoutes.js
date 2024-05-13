import express from 'express';
import { createIzin, updateIzin, deleteIzin } from '../controllers/IzinController.js';
import { AdminOnly } from '../middleware/AdminMiddleware.js';
import { authKaryawan } from '../middleware/AbsensiMiddleware.js';

const router = express.Router();

router.post('/izin', authKaryawan,createIzin);
//router.get('/izin', authenticateToken, getIzin);
//router.get('/izin/:id', authenticateToken, getIzinById)
router.put('/izin/:id',AdminOnly, updateIzin);
router.delete('/izin/:id', deleteIzin);

export default router;
