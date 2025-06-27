const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

router.post('/login', login); // correspond à POST /api/auth/login

module.exports = router;
