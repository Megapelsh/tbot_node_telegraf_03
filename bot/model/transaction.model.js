const { DataTypes } = require('sequelize');
const DATABASE = require('./db');

module.exports = DATABASE.define('balances',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    type: {
        type: DataTypes.STRING,
    },
    transaction_value: {
        type: DataTypes.FLOAT,
    },
    description: {
        type: DataTypes.TEXT,
    },
    author: {
        type: DataTypes.STRING,
    },
})