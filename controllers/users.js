const User = require('../models/user');
const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка работы сервера' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((userId) => {
      if (!userId) {
        return res.status(NOT_FOUND).send({ message: 'Объект не найден' });
      } return res.send({ data: userId });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Ошибка обработки данных' });
      } return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка работы сервера' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => res.send({ data: newUser }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Ошибка обработки данных' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка работы сервера' });
    });
};

module.exports.swapProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((updatedUser) => res.send({ data: updatedUser }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Ошибка обработки данных' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка работы сервера' });
    });
};

module.exports.swapAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((updatedUser) => res.send({ data: updatedUser }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Ошибка обработки данных' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка работы сервера' });
    });
};
