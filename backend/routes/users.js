const router = require('express').Router();
const {
  getUsers,
  /*   getUserById, */
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/users', auth, getUsers);
router.get('/users/me', auth, getUser);
router.patch('/users/me', auth, updateProfile);
router.patch('/users/me/avatar', auth, updateAvatar);
router.post('/signin', login);
router.post('/signup', createUser);
module.exports = router;
