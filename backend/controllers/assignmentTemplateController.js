const AssignmentTemplate = require('../models/AssignmentTemplate');
const pool = require('../models/db');

exports.createAssignmentTemplate = async (req, res) => {
  try {
    const { title, instructions, courseId, dueDate, createdBy } = req.body;

    const newTemplate = new AssignmentTemplate({
      title,
      instructions,
      courseId,
      dueDate,
      createdBy
    });

    const saved = await newTemplate.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Erreur création template :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.getAllAssignmentTemplates = async (req, res) => {
  try {
    const templates = await AssignmentTemplate.find();
    res.json(templates);
  } catch (err) {
    console.error("Erreur récupération templates :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};




exports.getTemplatesByStudentId = async (req, res) => {
  try {
    const userId = req.params.userId;

    // 1. Récupérer les UE de l'utilisateur depuis PostgreSQL
    const result = await pool.query(
      'SELECT unite_enseignement_id FROM affectation WHERE utilisateur_id = $1',
      [userId]
    );
    const ueIds = result.rows.map(row => row.unite_enseignement_id.toString());

    // 2. Filtrer les templates MongoDB par courseId ∈ [ueIds]
    const templates = await AssignmentTemplate.find({ courseId: { $in: ueIds } });

    res.json(templates);
  } catch (error) {
    console.error('Erreur getTemplatesByStudentId :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


exports.deleteAssignmentTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await AssignmentTemplate.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Devoir introuvable" });
    }

    res.json({ message: "Devoir supprimé avec succès" });
  } catch (err) {
    console.error('Erreur suppression template :', err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
