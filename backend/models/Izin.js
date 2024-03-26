import { Sequelize } from "sequelize";
import db from "../config/DataBase.js";
import Karyawan from "./Karyawan.js";

const {DataTypes} = Sequelize;

const Izin = db.define('Ijin', {
  // karyawan_id: {
  //   type: DataTypes.INTEGER
  // },
    tgl_izin: {
        type: DataTypes.DATE
      },
      status: {
        type: DataTypes.CHAR(1)
      },
      keterangan: {
        type: DataTypes.STRING
      },
      status_approved: {
        type: DataTypes.CHAR(1)
      },
      foto: {
        type: DataTypes.TEXT,
        allowNull: true
      }
});
Izin.belongsTo(Karyawan);
export default Izin;