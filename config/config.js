require('dotenv').config();
const env = process.env;


const development = {
    "username": "rooyt",
    "password": env.password,
    "database": env.database,
    "host": env.host,
    "dialect": "mysql",
    "timezone": "Asia/Seoul",
    "dialectOptions": {
      "charset": "utf8mb4",
      "dateStrings": true,
      "typeCast": true
    } 
  }

const test = {
  "username": "rooyt",
  "password": env.password,
  "database": env.database + '_test',
  "host": env.host,
  "dialect": "mysql"
}

const production = {
  "username": "root",
  "password": null,
  "database": "database_production",
  "host": "127.0.0.1",
  "dialect": "mysql"
}

  module.exports = { development, test };