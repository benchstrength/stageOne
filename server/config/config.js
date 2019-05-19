require("dotenv").config();

module.exports = {
    "username": process.env.dev_USERNAME,
    "password": process.env.dev_PASSWORD,
    "database": process.env.dev_DATABASE,
    "host": process.env.dev_HOST,
    "dialect": "mysql"
}