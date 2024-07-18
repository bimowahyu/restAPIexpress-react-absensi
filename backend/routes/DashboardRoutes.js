import express from 'express';
import { dashboard } from '../controllers/DashboardController.js';

const router = express.Router();

// Rute untuk halaman dashboard absensi
router.get('/dashboard/absensi', dashboard);

export default router;
