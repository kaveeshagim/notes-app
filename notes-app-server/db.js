// db.js
require('dotenv').config();
const pgp = require('pg-promise')();

// Configure your PostgreSQL client
const db = pgp({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

module.exports = db;
