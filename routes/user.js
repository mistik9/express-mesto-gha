const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserInfo, findUser, updateUser, updateAvatar,
} = require('../controllers/user');
const { RegExp } = require('../utils/constants');

userRouter.get('/', getUsers);
userRouter.get('/me', getUserInfo);

userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), findUser);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(RegExp),
  }),
}), updateAvatar);

module.exports = userRouter;
