const Card = require('../models/card')

const getCards = (req, res) => {

  Card.find({})
    .then(cards => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Something went wrong' })
    )
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  console.log(cardId)
  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      throw new Error("Not found");
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      console.log("err ==>", err.message)
      if (err.message === "Not found") {
        res.status(404).send({ message: "card not found" })
      } else {
        res.status(500).send({ message: "Something went wrong" })
      }
    })
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  const owner = req.user._id;
  console.log(res)
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send(card)
    })
    .catch(() => res.status(500).send({ message: 'Something went wrong' }));

};

const likeCard = (req, res) => {
  console.log(req.params.cardId)
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
  .orFail(() => {
    throw new Error("Not found");
  })
  .then((card) => {
    res.send(card);
  })
  .catch((err) => {
    console.log("err ==>", err.message)
    if (err.message === "Not found") {
      res.status(404).send({ message: "card not found" })
    } else {
      res.status(500).send({ message: "Something went wrong" })
    }
  })
}

const disLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
  .orFail(() => {
    throw new Error("Not found");
  })
  .then((card) => {
    res.send(card);
  })
  .catch((err) => {
    console.log("err ==>", err.message)
    if (err.message === "Not found") {
      res.status(404).send({ message: "card not found" })
    } else {
      res.status(500).send({ message: "Something went wrong" })
    }
  })

}


module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  disLikeCard
};
