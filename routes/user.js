const express = require('express');

const {
  getUsers, findUser, createUser, updateUser, updateAvatar,
} = require('../controllers/user');

const userRouter = express.Router();

userRouter.get('/users', getUsers);

userRouter.get('/users/:userId', findUser);

userRouter.post('/users/', createUser);

userRouter.patch('/users/me', updateUser);

userRouter.patch('/users/me/avatar', updateAvatar);

module.exports = userRouter;
