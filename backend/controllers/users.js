const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');

require('dotenv').config();

module.exports.getUsers = (req, res) => {
  User.findById({ _id: req.user._id })
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => {
      res.status(500).send({ message: 'Error' });
    });
};

module.exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({
      email: req.body.email,
      password: hash,
    })
      .then((user) => res.send(user))
      .catch((err) => {
        if ((err.code = 11000)) {
          res.status(409).send('email is already in use');
          return;
        }
        res.status(500).send(err);
      });
  });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Inncorrect password or email');
      }
      bcrypt.compare(password, user.password).then((bycrpytres) => {
        if (bycrpytres) {
          return res.send({
            token: jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: '7d',
            }),
          });
        }
        return res.status(401).send('Inncorrect password or email');
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { username: name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Invalid data passed to the methods Error Message',
        });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: `Invalid data passed to the methods Error Message:  ${err.message}`,
        });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.getUser = (req, res) => {
  User.findById({ _id: req.user._id })
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid ID' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'No User found with that id' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};
