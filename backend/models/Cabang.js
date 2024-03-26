import { Sequelize } from "sequelize";
import db from "../config/DataBase.js";

const {DataTypes} = Sequelize;

const Cabang = db.define('Cabang',{
    kode_cabang: {
        type: DataTypes.STRING(5)
      },
      nama_cabang: {
        type: DataTypes.STRING
      },
      lokasi_kantor: {
        type: DataTypes.STRING
      },
      radius: {
        type: DataTypes.INTEGER
      }
});

export default Cabang;