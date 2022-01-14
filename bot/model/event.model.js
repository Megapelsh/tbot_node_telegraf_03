const { DataTypes } = require('sequelize');
// const DATABASE = require('./db');
const db = require("../connection/db.connection");


module.exports = db.define('event',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    starts: {
        type: DataTypes.DATE,
    },
    place: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.FLOAT,
    },
    speaker: {
        type: DataTypes.STRING,
    },
    author: {
        type: DataTypes.STRING,
    },
})