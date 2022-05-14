const mongoose = require('mongoose');
const validator = require('validator');
const ValidationError = require('../errors/ValidationError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate(value) { if (!validator.isUrl(value)) { throw new ValidationError('Введены ны некорректные данные'); } },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    validate(value) { if (!validator.isEmail(value)) { throw new ValidationError('Введены ны некорректные данные'); } },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});
module.exports = mongoose.model('User', userSchema);
