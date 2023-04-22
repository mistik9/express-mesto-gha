const express = require('express');
const { getCards, deleteCard, createCard, likeCard, disLikeCard } = require('../controllers/card')
const cardRouter = express.Router();

cardRouter.get("/cards", getCards )

cardRouter.delete("/cards/:cardId", deleteCard)

cardRouter.post("/cards/", createCard)

cardRouter.put("/cards/:cardId/likes", likeCard)

cardRouter.delete("/cards/:cardId/likes", disLikeCard)


module.exports =cardRouter