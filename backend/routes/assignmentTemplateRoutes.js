const express = require('express');
const router = express.Router();
const {
  createAssignmentTemplate,
  getAllAssignmentTemplates,
  getTemplatesByStudentId,
  deleteAssignmentTemplate
} = require('../controllers/assignmentTemplateController');


router.post('/', createAssignmentTemplate);
router.get('/', getAllAssignmentTemplates);
router.get('/student/:userId', getTemplatesByStudentId);
router.delete('/:id', deleteAssignmentTemplate);

module.exports = router;
