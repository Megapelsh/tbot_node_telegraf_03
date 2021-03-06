require("dotenv").config();
const Sequelize = require("sequelize");

const DATABASE = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    }
);

DATABASE.authenticate()
    .then(() => console.log('Connected to DB.'))
    .catch((err) => console.error('DB connection error: ', err))

// sequelize.close()
//     .then(() => console.log('Closed.'))
//     .catch((err) =>
//         console.error('Close connection error: ', err)
//     )

module.exports = DATABASE;