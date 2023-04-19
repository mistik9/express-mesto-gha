const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user')
const cardRouter = require('./routes/card')

const app = express();
app.use(express.json());
app.use(userRouter);

const { PORT = 3000 } = process.env;



mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})