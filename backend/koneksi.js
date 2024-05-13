import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import db from "./config/DataBase.js";
import moment from 'moment-timezone';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
import UserRoutes from "./routes/UserRoutes.js";
import JamByIdRoutes from"./routes/JamByIdRoutes.js";
import AbsensiRoutes from "./routes/AbsensiRoutes.js"
import CabangRoutes from "./routes/CabangRoutes.js"
import DashboardRoutes from "./routes/DashboardRoutes.js"
import IzinRoutes from "./routes/IzinRoutes.js"
import JamRoutes from "./routes/JamRoutes.js"
import KaryawanRoutes from "./routes/KaryawanRoutes.js"
import DepartmentRoutes from "./routes/DepartmentRoutes.js"
import AuthRoutes from "./routes/AuthRoutes.js"
import AuthAdminRoutes from "./routes/AuthAdminRoutes.js"
import session from "express-session";



dotenv.config();

const app = express();

 
const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

// (async()=>{
//    await db.sync();
// })();

// app.use(session({
//     secret: process.env.SESS_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: store,
  
//     cookie: {
//         secure: 'auto'
//     }
// }));
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto',
        maxAge: 30 * 60 * 1000 // 30 menit
    }
}));
app.use((req, res, next) => {
    req.session._garbage = Date();
    req.session.touch();
    next();
});

app.use((req, res, next) => {
    res.setHeader('Date', moment().tz('Asia/Jakarta').format('ddd, DD MMM YYYY HH:mm:ss [GMT+0700]'));
    next();
});
app.use(fileUpload());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({
    credentials: true,
    origin:'http://localhost:3000'

}));


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
app.use(AuthRoutes);
app.use(AuthAdminRoutes);

// store.sync();
// const PORT = process.env.APP_PORT || 3000;
process.env.TZ = process.env.TIMEZONE;

// Endpoint untuk mendapatkan waktu saat ini dalam zona waktu Asia/Jakarta
app.get('/current-time', (req, res) => {
    const currentTime = res.locals.moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
    res.send(`Current time in GMT+7 is: ${currentTime}`);
});

app.listen(process.env.APP_PORT, ()=> {console.log('test server');});
 export default app