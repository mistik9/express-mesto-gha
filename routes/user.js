const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, findUser, updateUser, updateAvatar,
} = require('../controllers/user');

const userRouter = express.Router();
const { RegExp } = require('../utils/constants');

userRouter.get('/users', getUsers);

userRouter.get('/users/:userId', findUser);

userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

userRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(RegExp),
  }),
}), updateAvatar);

module.exports = userRouter;
