const routerCards = require('express').Router();
const {
  createCard, getCards, deleteCardById, putCardLike, deleteCardLike,
} = require('../controllers/cards');

routerCards.get('/', getCards);
routerCards.post('/', createCard);
routerCards.delete('/:cardId', deleteCardById);
routerCards.put('/:cardId/likes', putCardLike);
routerCards.delete('/:cardId/likes', deleteCardLike);

module.exports = routerCards;
