const routerUsers = require('express').Router();
const {
  getUsers, getUserById, createUser, swapProfile, swapAvatar,
} = require('../controllers/users');

routerUsers.get('/', getUsers);
routerUsers.get('/:userId', getUserById);
routerUsers.post('/', createUser);
routerUsers.patch('/me', swapProfile);
routerUsers.patch('/me/avatar', swapAvatar);

module.exports = routerUsers;
