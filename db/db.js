const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    "Testing",
    process.env.USER,
    process.env.PASSWORD,
    {
        dialect: "postgres",
        host: process.env.HOST,
    }
);

module.exports = sequelize;
