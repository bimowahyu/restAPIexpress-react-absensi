import express from 'express';
const router = express.Router();
import { 
   GetDepartment,GetDepartmentById,CreateDepartment,updateDepartment,destroyDepartment
} from "../controllers/DepartmentController.js";

// Routes untuk menampilkan semua departemen
router.get('/department', GetDepartment);

// Routes untuk menampilkan departemen berdasarkan ID
router.get('/department/:id', GetDepartmentById);

// Routes untuk menambahkan departemen baru
router.post('/department', CreateDepartment);

// Routes untuk memperbarui data departemen
router.put('/department/:id', updateDepartment);

// Routes untuk menghapus departemen
router.delete('/department/:id', destroyDepartment);

export default router;
