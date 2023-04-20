const Card = require('../models/card')

const getCards = (req, res) => {
    Card.find({})
        .then(cards => res.send(cards))
        .catch(() => res.status(500).send({ message: 'Something went wrong' })
        )
};

const deleteCard = (req, res) => {
    const { cardId } = req.params;
    console.log(req.params)
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
    console.log("==>", req.user._id)
    const owner = req.user._id;
    Card.create({ name, link, owner})
        .then((card) => {
            res.status(201).send(card)
        })
        .catch(() => res.status(500).send({ message: 'Произошла ошибка 2' }));

};

const likeCard = (req, res) => {
    Card.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
        { new: true },
    )
        .then(card => res.send({ data: ClipboardEvent }))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

const disLikeCard = (req, res) => {
    Card.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } }, // убрать _id из массива
        { new: true },
    )
    .then(card => res.send({ data: ClipboardEvent }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}


module.exports = {
    getCards,
    deleteCard,
    createCard,
    likeCard,
    disLikeCard
};
