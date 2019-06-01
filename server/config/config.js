require("dotenv").config();

module.exports = {
    "username": process.env.db_user,
    "password": process.env.db_password,
    "database": process.env.db_database,
    "host": process.env.db_host,
}
