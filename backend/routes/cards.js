const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');
const deleteCard = require('../middlewares/deleteCard');

router.get('/cards', auth, getCards);
router.post('/cards', auth, createCard);
router.delete('/cards/:cardId', auth, deleteCard, deleteCardById);
router.put('/cards/:cardId/likes', auth, likeCard);
router.delete('/cards/:cardId/likes', auth, dislikeCard);

module.exports = router;
