const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Register, login
router.post('/register', authController.register);
router.post('/login', authController.login);

// ✅ Add this line for the /me route
router.get('/me', protect, authController.getMe);

module.exports = router;
