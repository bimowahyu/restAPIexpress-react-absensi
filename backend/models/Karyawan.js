import { Sequelize } from "sequelize";
import db from "../config/DataBase.js"
import Department from "./Department.js";
import Cabang from "./Cabang.js";
//import JamById from "./JamById.js";

const {DataTypes} = Sequelize;

const Karyawan = db.define('Karyawan', {
    nik: {
      type: DataTypes.CHAR(16)
    },
    nama_lengkap: {
      type: DataTypes.STRING
    },
    jabatan: {
      type: DataTypes.STRING
    },
    no_telp: {
      type: DataTypes.STRING
    },
    avatar: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING
    },
    rememberToken: {
      type: DataTypes.STRING
    }
  });
  Karyawan.belongsTo(Department);
  Karyawan.belongsTo(Cabang);
 // Karyawan.hasMany(JamById, { foreignKey: 'karyawan_id', as: 'jamDetail' });

  export default Karyawan;