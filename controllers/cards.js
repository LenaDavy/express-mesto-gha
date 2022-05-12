const Card = require('../models/card');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const Forbidden = require('../errors/Forbidden');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((newCard) => {
      if (!newCard) {
        throw new ValidationError('Ошибка обработки данных');
      } res.send({ data: newCard });
    })
    .catch(next);
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        return Promise.reject;
      } return res.send({ data: cards });
    })
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card == null) {
        throw new NotFoundError('Объект не найден');
      } else if (JSON.stringify(card.owner) !== req.user._id) {
        throw new Forbidden('Доступ ограничен');
      } return res.send({ data: card });
    })
    .catch(next);
};

module.exports.putCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((cards) => {
      if (cards == null) {
        throw new NotFoundError('Объект не найден');
      } res.send({ data: cards });
    })
    .catch(next);
};

module.exports.deleteCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((cards) => {
      if (cards == null) {
        throw new NotFoundError('Объект не найден');
      } res.send({ data: cards });
    })
    .catch(next);
};
