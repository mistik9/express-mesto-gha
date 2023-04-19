const express = require('express');
const mongoose = require('mongoose');
const User = require("../models/user")

const userRouter = express.Router();


userRouter.get("/users", (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка 1' }));

})

userRouter.get("/users/:userId", (req, res) => {
  const { userId } = req.params;
  console.log(req.params)

  User.findById(userId)
    .then((user) => {
      res.send({ data: user })
    })
    .catch((err) => {
      console.log("err ==>", err)
      if (err.message == "Not found") {
        res.status(404).send({ message: "user not found" })
      } else {
        res.status(500).send({ message: "Something went wrong" })
      }
    })
})

userRouter.post("/users/", (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка 2' }));

})

module.exports = userRouter