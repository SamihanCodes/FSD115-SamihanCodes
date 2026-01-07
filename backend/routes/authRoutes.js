const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/profile', authenticate, (req, res) => {
  res.json({
    message: 'User profile accessed',
    user: req.user
  });
});

module.exports = router;
