const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ValdiationError = require('../errors/validation-err');
const ConflitError = require('../errors/confilt-err');
const CastError = require('../errors/confilt-err');
const ServerError = require('../errors/server-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.status(200).send(card))
    .catch(() => {
      throw new ServerError('Server Error');
    })
    .catch(next);
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValdiationError('Valdiation Error');
      }
    });
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findByIdAndDelete({ _id: req.params.cardId })
    .then(() => {
      res.status(200).send({ message: 'Card has been deleted' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError('Invalid id');
      } else if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError('No Card found with that id');
      } else {
        throw new ServerError('Server Error');
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError('Invalid id');
      } else if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError('No Card found with that id');
      } else {
        throw new ServerError('Server Error');
      }
    })
    .catch(next);
};
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError('Invalid id');
      } else if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError('No Card found with that id');
      } else {
        throw new ServerError('Server Error');
      }
    })
    .catch(next);
};
