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
