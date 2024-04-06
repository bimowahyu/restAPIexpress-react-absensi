import { Sequelize } from "sequelize";
import db from "../config/DataBase.js";
import Karyawan from "./Karyawan.js";
import Jam from "./Jam.js";

const {DataTypes} = Sequelize;

const Absensi = db.define('Absensi',{
    tgl_absensi: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      jam_masuk: {
        type: DataTypes.TIME,
        allowNull: true
      },
      jam_keluar: {
        type: DataTypes.TIME,
        allowNull: true
      },
      foto_masuk: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      foto_keluar: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      lokasi_masuk: {
        type: DataTypes.STRING,
        allowNull: true
      },
      lokasi_keluar: {
        type: DataTypes.STRING,
        allowNull: true
      }
});
// Absensi.belongsTo(Karyawan);
Absensi.belongsTo(Karyawan, { foreignKey: 'karyawan_id', as: 'karyawan' });
// Absensi.belongsTo(Jam);
Absensi.belongsTo(Jam, { foreignKey: 'jam_id', as: 'jamDetail' });
export default Absensi;