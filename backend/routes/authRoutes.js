const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  getProfile,
  updateProfile,
  logout
} = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/logout', logout);

module.exports = router;
