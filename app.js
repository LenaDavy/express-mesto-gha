const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = { _id: '6272ece80ae47ab1f2f4fc45' };
  next();
});
app.use('/users', routerUsers);
app.use('/cards', routerCards);
app.use('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Объект не найден' });
});

app.listen(PORT);
module.exports = { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR };
