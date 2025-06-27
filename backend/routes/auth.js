const express = require('express');
const router = express.Router();
const { login, register, updateProfile, changePassword } = require('../controllers/authController');

router.post('/login', login); // correspond à POST /api/auth/login
router.post('/register', register); // correspond à POST /api/auth/register
router.put('/profile', updateProfile); // correspond à PUT /api/auth/profile
router.put('/change-password', changePassword); // correspond à PUT /api/auth/change-password

module.exports = router;
