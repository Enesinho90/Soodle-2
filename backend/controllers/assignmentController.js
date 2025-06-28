const Assignment       = require('../models/Assignment');
const AssignmentTemplate = require('../models/AssignmentTemplate');
const pool             = require('../models/db');

exports.createAssignment = async (req, res) => {
  try {
    const file = req.file;
    const { studentId, assignmentTemplateId } = req.body;

    if (!file || !studentId || !assignmentTemplateId) {
      return res.status(400).json({ message: "Champs manquants" });
    }

    const newAssignment = new Assignment({
      studentId,
      assignmentTemplateId,
      file: {
        filename: file.originalname,
        uploadDate: new Date(),
        size: file.size,
        mimetype: file.mimetype,
        path: file.path
      }
    });

    const saved = await newAssignment.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Erreur dans createAssignment :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.getAssignmentsByStudent = async (req, res) => {
  try {
    const { studentId } = req.query;
    const filter = studentId ? { studentId } : {};
    const results = await Assignment.find(filter);
    res.json(results);
  } catch (err) {
    console.error("Erreur récupération des devoirs :", err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


exports.correctAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.id;
    const { score, comment } = req.body;

    const update = {
      grade: {
        score,
        comment,
        date: new Date()
      },
      status: 'corrigé'
    };

    const updated = await Assignment.findByIdAndUpdate(assignmentId, update, { new: true });

    if (!updated) {
      return res.status(404).json({ message: 'Devoir non trouvé' });
    }

    res.json(updated);
  } catch (error) {
    console.error('Erreur lors de la correction :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


exports.getAssignmentsByTeacher = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;

    // 1. UE du prof depuis PostgreSQL
    const result = await pool.query(
      'SELECT unite_enseignement_id FROM affectation WHERE utilisateur_id = $1',
      [teacherId]
    );
    const ueIds = result.rows.map(r => r.unite_enseignement_id.toString());

    // 2. Templates correspondant à ces UE
    const templates = await AssignmentTemplate.find({ courseId: { $in: ueIds } });
    const templateIds = templates.map(t => t._id.toString());

    // 3. Assignments liés à ces templates
    const assignments = await Assignment.find({
      assignmentTemplateId: { $in: templateIds }
    });

    res.json(assignments);
  } catch (err) {
    console.error('Erreur getAssignmentsByTeacher :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


const fs = require('fs');
const path = require('path');

// DELETE /api/assignments/:id
exports.deleteAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.id;

    // Trouve le devoir
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ message: 'Devoir introuvable' });

    // Supprime le fichier associé
    if (assignment.file && assignment.file.path) {
      const filePath = path.join(__dirname, '..', assignment.file.path);
      fs.unlink(filePath, (err) => {
        if (err) console.error('Erreur suppression fichier :', err);
      });
    }

    // Supprime le devoir de la BDD
    await Assignment.findByIdAndDelete(assignmentId);

    res.json({ message: 'Devoir supprimé avec succès' });
  } catch (err) {
    console.error('Erreur deleteAssignment :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
