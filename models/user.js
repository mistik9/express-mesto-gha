const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

mongoose.set('toJSON', { useProjection: true });
mongoose.set('toObject', { useProjection: true })

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Имя не может быть короче 2 символов'],
    maxlength: [30, 'Имя не может быть длиннее 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Наименование не может быть короче 2 символов'],
    maxlength: [30, 'Наименование не может быть длиннее 30 символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: [validator.isURL, 'Неправильный формат ссылки'],
  },
  email: {
    type: String,
    required: [true, 'Введите email'],
    unique: true,
    validate: [validator.isEmail, 'Неправильный формат почты'],
  },
  password: {
    type: String,
    required: [true, 'Введите пароль'],
    select: false,
  },

});
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
