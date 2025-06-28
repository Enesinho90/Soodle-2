const express = require('express');
const router = express.Router();
const logsController = require('../controllers/logsController');

router.post('/view-course', logsController.logViewCourse);
router.post('/logout', logsController.logLogout);

module.exports = router;