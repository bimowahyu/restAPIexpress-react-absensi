import { Sequelize } from "sequelize";
import db from "../config/DataBase.js"

const {DataTypes} = Sequelize;

const Jam = db.define('Jam', {
    kode_jamKerja: {
      type: DataTypes.STRING(4)
    },
    nama_jamKerja: {
      type: DataTypes.STRING(50)
    },
    awal_jamMasuk: {
      type: DataTypes.TIME
    },
    set_jamMasuk: {
      type: DataTypes.TIME
    },
    akhir_jamMasuk: {
      type: DataTypes.TIME
    },
    set_jamPulang: {
      type: DataTypes.TIME
    }
  });

  export default Jam;