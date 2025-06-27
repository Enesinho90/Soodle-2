const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// POST /api/posts  (création)
router.post('/', postController.uploadMiddleware, postController.createPost);

// GET  /api/posts  (liste)
router.get('/ue/:ueId', postController.getPostsByUE);


module.exports = router;