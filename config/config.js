require('dotenv').config();
const env = process.env;


const development = {
    "username": "rooyt",
    "password": env.password,
    "database": env.database,
    "host": env.host,
    "dialect": "mysql"
  }

  const test = {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }

  const production = {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }

  module.exports = { development };