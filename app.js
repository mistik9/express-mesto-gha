/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '644155fc0562b571ce829cfd',
  };
  next();
});

app.use(userRouter);
app.use(cardRouter);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(console.log('DB is connected'))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
