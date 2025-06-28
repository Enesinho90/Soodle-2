const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createAssignment, getAssignmentsByStudent,correctAssignment,getAssignmentsByTeacher,deleteAssignment   } = require('../controllers/assignmentController'); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// POST pour soumettre un devoir
router.post('/', upload.single('file'), createAssignment);

// GET pour récupérer les devoirs soumis
router.get('/', getAssignmentsByStudent);

router.patch('/:id', correctAssignment);

router.get('/teacher/:teacherId', getAssignmentsByTeacher);

router.delete('/:id', deleteAssignment);

module.exports = router;
