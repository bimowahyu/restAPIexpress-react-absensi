import { Sequelize } from 'sequelize';
import db from '../config/DataBase.js';
import Jam from './Jam.js'; 
import Karyawan from './Karyawan.js';

const {DataTypes} = Sequelize;

const JamById = db.define('JamById', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  karyawan_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  jam_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  hari: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Definisi hubungan dengan model Karyawan
JamById.belongsTo(Karyawan)
 // , { foreignKey: 'karyawan_id', as: 'karyawan' });

// Definisi hubungan dengan model Jam
JamById.belongsTo(Jam)
 // , { foreignKey: 'jam_id', as: 'jamDetail' });

export default JamById;
