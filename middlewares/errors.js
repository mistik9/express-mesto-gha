const {
  BAD_REQUEST,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER,
} = require('../utils/constants');

module.exports = ((err, req, res, next) => {
  if (err.code === 11000) {
    return res.status(CONFLICT).send({ message: 'Пользователь с таким email уже существует' });
  }
  if (err.name === 'ValidationError' || 'CastError') {
    return res.status(BAD_REQUEST).send({ message: `'Переданы некорректные данные${Object.values(err.errors).map((error) => error.message).join(', ')}` });
  }

  if (err.message === 'Not found') {
    res.status(NOT_FOUND).send({ message: 'Пользовательне найден' });
  }
  res.status(INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
  return next();
});
