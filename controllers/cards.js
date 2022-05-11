const Card = require('../models/card');
const { ValidationError } = require('../errors/ValidationError');
const { InternalServerError } = require('../errors/InternalServerError');

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
        throw new InternalServerError('Ошибка работы сервера');
      } res.send({ data: cards });
    })
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card == null) {
        res.status(404).send({ message: 'Объект не найден' });
      } else if (card.owner !== req.user._id) {
        res.status(403).send({ message: 'Доступ ограничен' });
      } else { res.status(200).send({ data: card }); }
    })
    .catch(next);
};

module.exports.putCardLike = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((cards) => {
    if (cards == null) {
      res.status(404).send({ message: 'Объект не найден' });
    } res.send({ data: cards });
  })
  .catch(next);

module.exports.deleteCardLike = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((cards) => {
    if (cards == null) {
      res.status(404).send({ message: 'Объект не найден' });
    } res.send({ data: cards });
  })
  .catch(next);
