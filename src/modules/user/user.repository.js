const pool = require('../../infrastructure/database/db');

async function getUsers() {
  // const [rows] = await pool.query('CALL get_users()');
  // return rows[0];
  return [{ id: 1, name: "Test User" }];
}

async function getUserById(id) {
  // const [rows] = await pool.query('CALL get_user_by_id(?)', [id]);
  // return rows[0][0];
  return [{ id: 1, name: "Test User By ID" }];
}

module.exports = {
  getUsers,
  getUserById,
};