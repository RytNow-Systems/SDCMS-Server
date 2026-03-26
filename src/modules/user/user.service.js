const userDB = require('../../modules/user/user.repository');

async function getAllUsers() {
  const users = await userDB.getUsers();

  return users.map(user => ({
    id: user.id,
    name: user.name,
  }));
}

module.exports = {
  getAllUsers,
};