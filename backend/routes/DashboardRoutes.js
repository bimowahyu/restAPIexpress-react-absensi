import express from 'express';
import { index } from '../controllers/DashboardController.js';

const router = express.Router();

// Rute untuk halaman dashboard absensi
router.get('/dashboard/absensi', index);

export default router;
