const express = require('express');
const router = express.Router();
const { login, register, updateProfile, changePassword, updateProfileAdmin, getAllUsers, deleteUser, getUserById } = require('../controllers/authController');
const upload = require('../middlewares/uploadAvatar');

router.post('/login', login); // correspond à POST /api/auth/login
router.post('/register', register); // correspond à POST /api/auth/register
router.put('/profile', upload.single('avatar'), updateProfile); // correspond à PUT /api/auth/profile // gestion upload avatar
router.put('/change-password', changePassword); // correspond à PUT /api/auth/change-password
router.put('/update-profil-admin', updateProfileAdmin); // correspond à PUT /api/auth/update-profil-admin
router.get('/users', getAllUsers); // correspond à GET /api/auth/users
router.get('/user/:id', getUserById); // correspond à GET /api/auth/user/:id
router.delete('/user/:id', deleteUser); // correspond à DELETE /api/auth/user/:id
module.exports = router;
