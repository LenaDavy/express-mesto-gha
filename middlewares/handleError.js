function handleErrror(err, res) {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'Ошибка работы сервера' : message });
}

module.exports = handleErrror;
