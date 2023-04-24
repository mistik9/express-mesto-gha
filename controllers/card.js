const Card = require('../models/card');
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER,
} = require('../errors');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(OK).send(cards))
    .catch(() => res.status(INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' }));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      throw new Error('Not found');
    })
    .then((card) => {
      res.status(OK).send(card);
    })
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      } else {
        res.status(INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: `${Object.values(err.errors).map((error) => error.message).join(', ')}` });
      } else {
        res.status(INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('Not found');
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      } else {
        res.status(INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const disLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('Not found');
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      } else {
        res.status(INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  disLikeCard,
};
