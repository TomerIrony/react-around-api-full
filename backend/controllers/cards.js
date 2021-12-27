const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.status(200).send(card))
    .catch(() => {
      res.status(500).send({ message: 'Error' });
    });
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
        res.status(400).send(err);
      }
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndDelete({ _id: req.params.cardId })
    .orFail()
    .then(() => {
      res.status(200).send({ message: 'Card has been deleted' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid id' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'No Card found with that id' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.likeCard = (req, res) => {
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
        res.status(400).send({ message: 'Invalid id' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'No Card found with that id' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid id' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'No Card found with that id' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};
