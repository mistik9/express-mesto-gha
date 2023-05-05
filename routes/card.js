const express = require('express');
const { celebrate, Joi } = require('celebrate');

const { RegExp } = require('../utils/constants');
const {
  getCards, deleteCard, createCard, likeCard, disLikeCard,
} = require('../controllers/card');

const cardRouter = express.Router();

cardRouter.get('/', getCards);

cardRouter.delete('/:cardId', deleteCard);

cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    link: Joi.string()
      .pattern(RegExp),
    name: Joi.string().min(2).max(30),
  }),
}), createCard);

cardRouter.put('/:cardId/likes', likeCard);

cardRouter.delete('/:cardId/likes', disLikeCard);

module.exports = cardRouter;
