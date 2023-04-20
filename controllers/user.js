const User = require('../models/user')

const getUsers = (req, res) => {
    User.find({})
        .then(users => res.send(users))
        .catch(() => res.status(500).send({ message: 'Something went wrong' })
        )
};

const findUser = (req, res) => {
    const { userId } = req.params;
    console.log(req.params)
      User.findById(userId)
        .orFail(() => {
            throw new Error("Not found");
       
        })
        .then((user) => {
            res.send(user);
        })
        .catch((err) => {
  console.log("err ==>", err.message) 
            if (err.message === "Not found") {
                res.status(404).send({ message: "user not found" })
            } else {
                res.status(500).send({ message: "Something went wrong" })
            }
        })
};

const createUser = (req, res) => {
    const { name, about, avatar } = req.body;
    console.log(req.body)

    User.create({ name, about, avatar })
        .then((user) => {
            res.status(201).send(user)
        })
        .catch(() => res.status(500).send({ message: 'Произошла ошибка 2' }));
        console.log(res.status)
};

const updateUser = (req, res) => {
    const { name, about } = req.body;
    console.log(req.body)
    User.findByIdAndUpdate(req.params.id, {name, about})
        .then((user) => {
            if(!user) {
                throw new Error ("Пользователь не найден")
            }
            res.status(201).send(user)
        })
        .catch(() => res.status(500).send({ message: 'Произошла ошибка 2' }));
        console.log(res.status)
};

const updateAvatar = (req, res) => {
    const { avatar } = req.body;
    console.log(req.body)
    User.findByIdAndUpdate(req.params.id, { avatar })
        .then((user) => {
            res.status(201).send(user)
        })
        .catch(() => res.status(500).send({ message: 'Произошла ошибка 2' }));
        console.log(res.status)
};

module.exports = {
    getUsers,
    findUser,
    createUser,
    updateUser,
    updateAvatar
};