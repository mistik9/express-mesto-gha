const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER,
} = require('../errors');

const getUsers = (req, res) => {
  console.log(req);
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' }));
};

const findUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      throw new Error('Not found');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(NOT_FOUND).send({ message: 'Пользовательне найден' });
      } else if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const createUser = (req, res) => {
  //  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(req.body.password, 10)

    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: `${Object.values(err.errors).map((error) => error.message).join(', ')}` });
      } else {
        res.status(INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      throw new Error('Not found');
    })
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(NOT_FOUND).send({ message: 'Пользовательне найден' });
      } else if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: `${Object.values(err.errors).map((error) => error.message).join(', ')}` });
      } else {
        res.status(INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      throw new Error('Not found');
    })
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(NOT_FOUND).send({ message: 'Пользовательне найден' });
      } else if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: `${Object.values(err.errors).map((error) => error.message).join(', ')}` });
      } else {
        res.status(INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.status(OK).send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: 'Неправильные почта или па' });
    });
};

module.exports = {
  getUsers,
  findUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
