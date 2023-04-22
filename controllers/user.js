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
      console.error(err)
      if (err.message === "Not found") {
        res.status(404).send({ message: "user not found" })
      } else {
        res.status(500).send({ message: "Something went wrong" })
      }
    })
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user)
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка 2' }));

};

const updateUser = (req, res) => {
   const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .orFail(() => {
      throw new Error("Not found");
    })
    .then((user) => {
      res.status(201).send(user)
    })
    .catch((err) => {
      console.error(err)
      if (err.message === "Not found") {
        res.status(404).send({ message: "user not found" })
      } else {
        res.status(500).send({ message: "Something went wrong" })
      }
    })

};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  console.log(req.user._id)
  User.findByIdAndUpdate(req.user._id, { avatar })
  .orFail(() => {
    throw new Error("Not found");
  })
  .then((user) => {
    res.status(201).send(user)
  })
  .catch((err) => {
    console.error(err)
    if (err.message === "Not found") {
      res.status(404).send({ message: "user not found" })
    } else {
      res.status(500).send({ message: "Something went wrong" })
    }
  })
};

module.exports = {
  getUsers,
  findUser,
  createUser,
  updateUser,
  updateAvatar
};