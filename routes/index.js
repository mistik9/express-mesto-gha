// const router = require('express').Router();
const userRouter = require('./user');
const cardRouter = require('./card');
const signinRouter = require('./signin');
const signupRouter = require('./signup');
// const auth = require('../middlewares/auth');

// router.use('/users', auth, userRouter);
// router.use('/cards', auth, cardRouter);
// router.use('/signin', signinRouter);
// router.use('/signup', signupRouter);

module.exports = {
  userRouter, cardRouter, signinRouter, signupRouter,
};
