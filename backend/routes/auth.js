const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');

router.post('/login', login); // correspond à POST /api/auth/login
router.post('/register', register); // correspond à POST /api/auth/register

module.exports = router;
