const mongoose = require('mongoose');

const assignmentTemplateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructions: { type: String },
  courseId: { type: String, required: true },
  dueDate: { type: Date },
  createdBy: { type: String }
});

module.exports = mongoose.model('AssignmentTemplate', assignmentTemplateSchema);
