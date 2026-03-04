const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, isAdmin } = require('../middleware/adminAuth');

// 👤 Regular user routes
router.get('/me', protect, userController.getMe);
router.patch('/me', protect, userController.updateMe);

// 🔐 Admin-only routes
router.use(protect, isAdmin);

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
