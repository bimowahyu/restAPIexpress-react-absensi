import express from "express";
import {Login, logOut ,Me} from "../controllers/AuthAdmin.js"

const router = express.Router();

router.post('/loginAdmin',Login);
router.get('/Me', Me);
router.delete('/logoutAdmin',logOut);


export default router;