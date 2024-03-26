import { Sequelize } from "sequelize";
import db from "../config/DataBase.js";

const {DataTypes} = Sequelize;

const Department = db.define('Department' , {
    kode_department: {
        type: DataTypes.STRING(10)
      },
      nama_department: {
        type: DataTypes.STRING(50)
      }
});

export default Department;