const { DataTypes } = require("sequelize");
const db = require("../connection/db.connection");
module.exports = db.define("user",
   {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
         unique: true
      },
      chatID: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      firstName: {
         type: DataTypes.STRING
      },
      lastName: {
         type: DataTypes.STRING
      },
      username: {
         type: DataTypes.STRING
      },
      admin: {
         type: DataTypes.BOOLEAN,
         defaultValue: false
      },
      startPayload: {
         type: DataTypes.STRING
      }
   },
   {
      timestamps: false
   }
);
