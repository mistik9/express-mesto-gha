const express = require('express');
const { celebrate, Joi } = require('celebrate');

const { RegExp } = require('../utils/constants');
const {
  getCards, deleteCard, createCard, likeCard, disLikeCard,
} = require('../controllers/card');

const cardRouter = express.Router();

cardRouter.get('/cards/', getCards);

cardRouter.delete('/cards/:cardId', deleteCard);

cardRouter.post('/cards/', celebrate({
  body: Joi.object().keys({
    link: Joi.string()
      .pattern(RegExp),
    name: Joi.string().min(2).max(30),
  }),
}), createCard);

cardRouter.put('/cards/:cardId/likes', likeCard);

cardRouter.delete('/cards/:cardId/likes', disLikeCard);

module.exports = cardRouter;
