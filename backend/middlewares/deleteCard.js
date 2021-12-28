const Card = require('../models/card');

module.exports = (req, res, next) => {
  Card.findById({ _id: req.params.cardId })
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        next();
      } else {
        return res.status(403).send({ message: 'Authorization Required' });
      }
    })
    .catch(() => {
      res.status(404).send('Card not found');
    });
};
