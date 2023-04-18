const express = require('express');
const mongoose = require('mongoose');

const userRouter = express.Router();


userRouter.get("/users", (req, res) =>{
  res.send ({ data:user })
})

userRouter.get("/users/:userId", (req,res) =>{
  const { id } =req.params;
  console.log(req.params)
  const  user = users.find((user) => user.id === Number(id))
  if(user) {
    res.send({ data:user })
  } else {
    res.status(404).send({message: "user not found"})
  }
})

userRouter.post("/users/", (req,res) =>{
  const { name, about, avatar } = req.body;
const user = {
  name,
  about,
  avatar
}
users.push(user);
res.status(201).send({ data: user })
})

module.exports = userRouter