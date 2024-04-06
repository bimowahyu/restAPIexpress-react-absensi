import express from 'express';
import { LoginKaryawan, MeKaryawan, logOutKaryawan } from "../controllers/AuthController.js"

const router = express.Router();

router.get('/MeKaryawan', MeKaryawan);
router.post('/loginKaryawan', LoginKaryawan);
router.delete('/logoutKaryawan', logOutKaryawan);

export default router;