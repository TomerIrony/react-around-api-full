const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    validate: [validator.isEmail, 'invalid email'],
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  username: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: {
      validator: (v) => {
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid link`,
    },
  },
});

userSchema.statics.findUserByCredentials = (email, password) => {
  this.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject(new Error('Incorrect password or email'));
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Incorrect password or email'));
      }

      return user;
    });
  });
};

module.exports = mongoose.model('user', userSchema);
