const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const AuthorizationError = require('../errors/auth-err');

module.exports = (req, res, next) => {
  Card.findById({ _id: req.params.cardId })
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        next();
      } else {
        throw new AuthorizationError('Authorization Required');
      }
    })
    .catch(() => {
      throw new NotFoundError('Card not found');
    })
    .catch(next);
};
