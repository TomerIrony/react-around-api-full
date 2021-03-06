const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: [true, 'User avatar link is required'],
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },

  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
