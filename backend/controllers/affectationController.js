const pool = require('../models/db');

exports.getAllAffectations = async (req, res) => {
    try {
        const result = await pool.query('SELECT id, utilisateur_id, unite_enseignement_id, date_inscription FROM affectation ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de la récupération des affectations" });
    }
};

exports.getAffectationsByUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT id, utilisateur_id, unite_enseignement_id, date_inscription FROM affectation WHERE utilisateur_id = $1 ORDER BY id', [id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de la récupération des affectations de l'utilisateur" });
    }
};

exports.getUesByUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`
            SELECT ue.* FROM unite_enseignement ue
            JOIN affectation a ON ue.id = a.unite_enseignement_id
            WHERE a.utilisateur_id = $1
            ORDER BY ue.id
        `, [id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de la récupération des UE de l'utilisateur" });
    }
};

exports.createAffectation = async (req, res) => {
    const { utilisateur_id, unite_enseignement_id } = req.body;
    console.log('Reçu POST /affectations', { utilisateur_id, unite_enseignement_id }); // LOG DEBUG
    if (!utilisateur_id || !unite_enseignement_id) {
        return res.status(400).json({ error: "Champs manquants pour la création de l'affectation" });
    }
    try {
        const result = await pool.query(
            'INSERT INTO affectation (utilisateur_id, unite_enseignement_id, date_inscription) VALUES ($1, $2, NOW()) RETURNING *',
            [utilisateur_id, unite_enseignement_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de la création de l'affectation" });
    }
};

exports.deleteAffectation = async (req, res) => {
    const { utilisateur_id, unite_enseignement_id } = req.params;
    console.log('Reçu DELETE /affectations', { utilisateur_id, unite_enseignement_id }); // LOG DEBUG
    if (!utilisateur_id || !unite_enseignement_id) {
        return res.status(400).json({ error: "Champs manquants pour la suppression de l'affectation" });
    }
    try {
        const result = await pool.query(
            'DELETE FROM affectation WHERE utilisateur_id = $1 AND unite_enseignement_id = $2 RETURNING *',
            [utilisateur_id, unite_enseignement_id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Affectation non trouvée" });
        }
        res.json({ message: "Affectation supprimée avec succès" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de la suppression de l'affectation" });
    }
};

// Récupérer tous les professeurs, admin, admin/professeur affectés à un cours donné
exports.getAdminAndProfByCourseId = async (req, res) => {
    const { id } = req.params; // id du cours (unite_enseignement_id)
    try {
        const result = await pool.query(`
            SELECT u.* FROM utilisateur u
            JOIN affectation a ON u.id = a.utilisateur_id
            WHERE a.unite_enseignement_id = $1
            AND (
                u.roles::text LIKE '%ROLE_PROFESSEUR%'
                OR u.roles::text LIKE '%ROLE_ADMIN%'
            )
            ORDER BY u.nom, u.prenom
        `, [id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs affectés à ce cours" });
    }
};

// Récupérer toutes les affectations d'étudiants (ROLE_ETUDIANT uniquement) pour un cours donné
exports.getAffectationsEtudiantsByCourseId = async (req, res) => {
    const { id } = req.params; // id du cours (unite_enseignement_id)
    try {
        const result = await pool.query(`
            SELECT a.* FROM affectation a
            JOIN utilisateur u ON u.id = a.utilisateur_id
            WHERE a.unite_enseignement_id = $1
            AND u.roles::text LIKE '%ROLE_USER%'
            ORDER BY a.id
        `, [id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de la récupération des affectations étudiants pour ce cours" });
    }
};

// Récupérer tous les utilisateurs ayant uniquement le rôle ROLE_USER pour un cours donné
exports.getEtudiantsByCourseId = async (req, res) => {
    const { id } = req.params; // id du cours (unite_enseignement_id)
    try {
        const result = await pool.query(`
            SELECT u.* FROM utilisateur u
            JOIN affectation a ON u.id = a.utilisateur_id
            WHERE a.unite_enseignement_id = $1
            AND u.roles::text = '["ROLE_USER"]'
            ORDER BY u.nom, u.prenom
        `, [id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de la récupération des étudiants pour ce cours" });
    }
};
