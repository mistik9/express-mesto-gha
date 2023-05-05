/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { NOT_FOUND } = require('./utils/constants');
const error = require('./middlewares/errors');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

app.use(router);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(console.log('DB is connected'))
  .catch((err) => console.log(err));

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Страница не найденa' });
});

app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
