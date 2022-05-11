require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token == null) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  } let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    console.log(payload);
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  } req.user = payload;
  return next();
};
