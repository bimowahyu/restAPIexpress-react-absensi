import express from 'express';
import { createIzin, updateIzin, deleteIzin } from '../controllers/IzinController.js';
//import {  } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/izin', createIzin);
//router.get('/izin', authenticateToken, getIzin);
//router.get('/izin/:id', authenticateToken, getIzinById)
router.put('/izin/:id', updateIzin);
router.delete('/izin/:id', deleteIzin);

export default router;
