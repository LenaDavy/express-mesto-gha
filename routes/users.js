const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getMe, getUserById, swapProfile, swapAvatar,
} = require('../controllers/users');

routerUsers.get('/', getUsers);
routerUsers.get('/me', getMe);
routerUsers.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserById);

routerUsers.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), swapProfile);

routerUsers.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/),
  }),
}), swapAvatar);

module.exports = routerUsers;
