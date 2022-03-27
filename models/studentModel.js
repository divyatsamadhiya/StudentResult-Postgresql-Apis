const Sequelize = require("sequelize");
const sequelize = require("../db/db.js");

const Student = sequelize.define("student", {
    Name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Age: {
        type: Sequelize.INTEGER,
    },
    Mark1: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Mark2: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Mark3: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});
module.exports = Student;
