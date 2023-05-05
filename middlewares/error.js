const {
  NotFoundError, ServerError, ConflictError, BadRequestError,
} = require('../utils/errors/index');

module.exports = ((err, req, res, next) => {
  console.log(err.name);
  if (err.name === 'ValidationError' || 'CastError') {
    return res.status(BadRequestError).send({ message: `'Переданы некорректные данные${Object.values(err.errors).map((error) => error.message).join(', ')}` });
  }
  if (err.code === 11000) {
    return res.status(ConflictError).send({ message: 'Пользователь с таким email уже существует' });
  }
  if (err.message === 'Not found') {
    res.status(NotFoundError).send({ message: 'Пользовательне найден' });
  }
  res.status(ServerError).send({ message: 'На сервере произошла ошибка' });
  return next();
});
