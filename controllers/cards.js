const Card = require('../models/card');
const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/constants');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((newCard) => res.send({ data: newCard }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Ошибка обработки данных' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка работы сервера' });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка работы сервера' }));
};

module.exports.deleteCardById = (req, res) => Card.findByIdAndRemove(req.params.cardId)
  .then((cards) => {
    if (!cards) {
      return res.status(NOT_FOUND).send({ message: 'Объект не найден' });
    } return res.send({ data: cards });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(BAD_REQUEST).send({ message: 'Ошибка обработки данных' });
    } return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка работы сервера' });
  });

module.exports.putCardLike = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((cards) => {
    if (!cards) {
      return res.status(NOT_FOUND).send({ message: 'Объект не найден' });
    } return res.send({ data: cards });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(BAD_REQUEST).send({ message: 'Ошибка обработки данных' });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка работы сервера' });
  });

module.exports.deleteCardLike = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((cards) => {
    if (!cards) {
      return res.status(NOT_FOUND).send({ message: 'Объект не найден' });
    } return res.send({ data: cards });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(BAD_REQUEST).send({ message: 'Ошибка обработки данных' });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка работы сервера' });
  });
