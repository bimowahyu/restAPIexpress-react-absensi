import express from "express";
import fileUpload from "express-fileupload";
import db from "./config/DataBase.js";
import dotenv from "dotenv";
import UserRoutes from "./routes/UserRoutes.js";
import JamByIdRoutes from"./routes/JamByIdRoutes.js";
import AbsensiRoutes from "./routes/AbsensiRoutes.js"
import CabangRoutes from "./routes/CabangRoutes.js"
import DashboardRoutes from "./routes/DashboardRoutes.js"
import IzinRoutes from "./routes/IzinRoutes.js"
import JamRoutes from "./routes/JamRoutes.js"
import KaryawanRoutes from "./routes/KaryawanRoutes.js"
import DepartmentRoutes from "./routes/DepartmentRoutes.js"

dotenv.config();

const app = express();

// (async () => {
//     try {
//         await db.sync();
//         console.log("Database synced successfully");
//     } catch (error) {
//         console.error("Error syncing database:", error);
//         process.exit(1); // Exit the process if sync fails
//     }
// })();

app.use(express.json());
app.use(UserRoutes);
app.use(JamByIdRoutes);
app.use(AbsensiRoutes);
app.use(CabangRoutes);
app.use(DashboardRoutes);
app.use(IzinRoutes);
app.use(JamRoutes);
app.use(KaryawanRoutes);
app.use(DepartmentRoutes);


// const PORT = process.env.APP_PORT || 3000;

app.listen(process.env.APP_PORT, ()=> {console.log('test server');});
 export default app