const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');

// Forum par cours
router.get('/:courseId', forumController.getForumByCourse);

// Créer un thread
router.post('/:courseId/threads', forumController.createThread);

// Ajouter une réponse
router.post('/:courseId/threads/:threadId/messages', forumController.addMessage);

module.exports = router;
