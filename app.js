/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');
const auth = require('./middlewares/auth');
const { NOT_FOUND } = require('./errors');
const {
  createUser, login,
} = require('./controllers/user');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

// app.use((req, res, next) => {
//   req.user = {
//     _id: '644155fc0562b571ce829cfd',
//   };
//   next();
// });

app.use(userRouter);
app.use(cardRouter);

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use('/cards', require('./routes/card'));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(console.log('DB is connected'))
  .catch((err) => console.log(err));

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
