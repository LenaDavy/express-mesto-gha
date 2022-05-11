const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');
const { ValidationError } = require('../errors/ValidationError');
const { InternalServerError } = require('../errors/InternalServerError');
const { Unauthorized } = require('../errors/Unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((newUser) => {
      if (!newUser) {
        throw new ValidationError('Ошибка обработки данных');
      } res.send({
        name: newUser.name,
        about: newUser.about,
        avatar: newUser.avatar,
        email: newUser.email,
        _id: newUser._id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.status(409).send({ message: 'Некорректный запрос' });
      } next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (user == null) {
        res.status(401).send({ message: 'Неправильная почта или пароль' });
      } bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized('Неправильная почта или пароль');
          } const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
          res.cookie('jwt', token, { maxAge: 3600000, httpOnly: true, sameSite: true }).send({
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
            _id: user._id,
          });
        });
    })
    .catch(next);
};

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user == null) {
        throw new InternalServerError('Ошибка работы сервера');
      } res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      });
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new InternalServerError('Ошибка работы сервера');
      } res.send({ data: users });
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((userId) => {
      console.log(userId);
      if (userId == null) {
        res.status(404).send({ message: 'Объект не найден' });
      } res.send({ data: userId });
    })
    .catch(next);
};

module.exports.swapProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        throw new ValidationError('Ошибка обработки данных');
      } res.send({ data: updatedUser });
    })
    .catch(next);
};

module.exports.swapAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        throw new ValidationError('Ошибка обработки данных');
      } res.send({ data: updatedUser });
    })
    .catch(next);
};
