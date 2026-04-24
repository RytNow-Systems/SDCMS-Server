import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Execute the config immediately (similar to require('dotenv').config())
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

// Use 'export default' instead of module.exports
export default pool;
