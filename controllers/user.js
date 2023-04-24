const User = require('../models/user');
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER,
} = require('../errors');

const getUsers = (req, res) => {
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
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      } else {
        res.status(INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
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

module.exports = {
  getUsers,
  findUser,
  createUser,
  updateUser,
  updateAvatar,
};
