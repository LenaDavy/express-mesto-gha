const routerCards = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createCard, getCards, deleteCardById, putCardLike, deleteCardLike,
} = require('../controllers/cards');

routerCards.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().min(2).max(30).required()
      .regex(/^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/),
  }),
}), createCard);
routerCards.get('/', getCards);
routerCards.delete('/:cardId', deleteCardById);
routerCards.put('/:cardId/likes', putCardLike);
routerCards.delete('/:cardId/likes', deleteCardLike);

module.exports = routerCards;
