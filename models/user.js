const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле не может быть пустым'],
    minlength: [2, 'Имя пользователя не может быть короче двух символов'],
    maxlength: [30, 'Имя пользователя не может быть длиннее 30 символов'],
  },
  about: {
    type: String,
    required: [true, 'Поле не может быть пустым'],
    minlength: [2, 'Информация о пользователе не может быть короче двух символов'],
    maxlength: [30, 'Информация о пользователе не может быть длиннее 30 символов'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле не может быть пустым'],
  },
});
module.exports = mongoose.model('user', userSchema);
