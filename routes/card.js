const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { RegExp } = require('../utils/constants');
const {
  getCards, deleteCard, createCard, likeCard, disLikeCard,
} = require('../controllers/card');

cardRouter.get('/', getCards);

cardRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), deleteCard);

cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    link: Joi.string().required()
      .pattern(RegExp),
    name: Joi.string().required().min(2).max(30),
  }),
}), createCard);

cardRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), likeCard);

cardRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), disLikeCard);

module.exports = cardRouter;
