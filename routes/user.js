const express = require('express');
const mongoose = require('mongoose');
const User = require("../models/user")
const {getUsers, findUser, createUser, updateUser, updateAvatar} = require('../controllers/user')

const userRouter = express.Router();

userRouter.get("/users", getUsers )

userRouter.get("/users/:userId", findUser)

userRouter.post("/users/", createUser)

userRouter.patch("/users/me", updateUser)

userRouter.patch("/users/me/avatar", updateAvatar)

module.exports = userRouter