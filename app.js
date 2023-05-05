/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
// const router = require('./routes/index');
const { NOT_FOUND } = require('./utils/constants');
const {
  userRouter, cardRouter, signupRouter, signinRouter,
} = require('./routes/index');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

// app.use(router);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(console.log('DB is connected'))
  .catch((err) => console.log(err));

app.use('/signup', signupRouter);
app.use('/signin', signinRouter);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);

// app.use((req, res, next) => next(res.status(NOT_FOUND).send({ message: 'Страница не найден' })));
app.use(errors());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
