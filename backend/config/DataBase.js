import {Sequelize} from "sequelize";

const db = new Sequelize('absenjs_db', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;