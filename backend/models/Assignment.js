const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  assignmentTemplateId: { type: String, required: true }, // AJOUTE ÇA
  courseId: { type: String },  // optionnel
  file: {
    filename: String,
    uploadDate: { type: Date, default: Date.now },
    size: Number,
    mimetype: String,
    path: String
  },
  grade: {
    score: Number,
    comment: String,
    date: Date
  },
  status: { type: String, default: 'en attente' }
});

module.exports = mongoose.model('Assignment', assignmentSchema);
