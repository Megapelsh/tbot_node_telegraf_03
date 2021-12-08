const { DataTypes } = require("sequelize");
const db = require("../connection/db.connection");
module.exports = db.define("user",
   {
       id: {
           type: DataTypes.INTEGER,
           autoIncrement: true,
           primaryKey: true,
           unique: true,
       },
       username: {
           type: DataTypes.STRING,
       },
       first_name: {
           type: DataTypes.STRING,
       },
       last_name: {
           type: DataTypes.STRING,
       },
       telegram_id: {
           type: DataTypes.STRING,
           unique: true,
       },
       phone: {
           type: DataTypes.STRING,
       },
       qrcode: {
           type: DataTypes.STRING,
       },
       user_group: {
           type: DataTypes.STRING,
       },
       balance: {
           type: DataTypes.FLOAT,
       },
       startPayload: {
           type: DataTypes.STRING
       },
   }
);
