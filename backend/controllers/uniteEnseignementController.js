const pool = require('../models/db');
const fs = require('fs');
const path = require('path');
const { logActivity } = require('../services/logService');

// Contrôleur pour les unités d'enseignement (optionnel si logique complexe à ajouter plus tard)
// Pour l'instant, la logique est directement dans la route.

exports.getAllUes = async (req, res) => {
    try {
        const result = await pool.query('SELECT id, code, intitule, image FROM unite_enseignement ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de la récupération des unités d'enseignement" });
    }
};

exports.updateUe = async (req, res) => {
    // Si c'est un form-data (upload), req.file existe
    console.log('Fichier reçu pour modification :', req.file);
    if (req.file) {
        const { id, code, intitule, imageName } = req.body;
        if (!id || !code || !intitule) {
            return res.status(400).json({ error: 'Champs manquants pour la modification de l\'UE' });
        }
        // Renommage du fichier uploadé avec le nom souhaité
        const extension = path.extname(req.file.originalname);
        const newFileName = imageName || req.file.filename + extension;
        const oldPath = req.file.path;
        const newPath = path.join(path.dirname(oldPath), newFileName);
        let image = null;
        try {
            fs.renameSync(oldPath, newPath);
            image = newFileName;
        } catch (err) {
            console.error('Erreur lors du renommage du fichier :', err);
            return res.status(500).json({ error: "Erreur lors du traitement de l'image" });
        }
        try {
            const result = await pool.query(
                'UPDATE unite_enseignement SET code = $1, intitule = $2, image = $3 WHERE id = $4 RETURNING *',
                [code, intitule, image, id]
            );
            if (result.rowCount === 0) {
                return res.status(404).json({ error: 'Unité d\'enseignement non trouvée' });
            }
            // Log d'activité MongoDB
            await logActivity({
                userId: id,
                action: 'update ue',
                details: {
                    ip: req.ip,
                    browser: req.headers['user-agent'],
                }
            });
            res.json(result.rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Erreur lors de la modification de l'unité d'enseignement" });
        }
    } else {
        // Sinon, modification classique sans image
        const { id, code, intitule, image } = req.body;
        if (!id || !code || !intitule || !image) {
            return res.status(400).json({ error: 'Champs manquants pour la modification de l\'UE' });
        }
        try {
            const result = await pool.query(
                'UPDATE unite_enseignement SET code = $1, intitule = $2 WHERE id = $3 RETURNING *',
                [code, intitule, id]
            );
            if (result.rowCount === 0) {
                return res.status(404).json({ error: 'Unité d\'enseignement non trouvée' });
            }
            // Log d'activité MongoDB
            await logActivity({
                userId: id,
                action: 'update ue',
                details: {
                    ip: req.ip,
                    browser: req.headers['user-agent'],
                }
            });
            res.json(result.rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Erreur lors de la modification de l'unité d'enseignement" });
        }
    }
};

exports.deleteUe = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "ID manquant pour la suppression de l'unité d'enseignement" });
    }
    try {
        const result = await pool.query('DELETE FROM unite_enseignement WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Unité d'enseignement non trouvée" });
        }
        // Log d'activité MongoDB
        await logActivity({
            userId: id,
            action: 'delete ue',
            details: {
                ip: req.ip,
                browser: req.headers['user-agent'],
                id: id,
            }
        });
        res.json({ message: "Unité d'enseignement supprimée avec succès" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de la suppression de l'unité d'enseignement" });
    }
};

exports.createUe = async (req, res) => {
    const { code, intitule, imageName } = req.body;
    let image = null;
    if (req.file) {
        // Renommage du fichier uploadé avec le nom souhaité
        const extension = path.extname(req.file.originalname);
        const newFileName = imageName || req.file.filename + extension;
        const oldPath = req.file.path;
        const newPath = path.join(path.dirname(oldPath), newFileName);
        try {
            fs.renameSync(oldPath, newPath);
            image = newFileName;
        } catch (err) {
            console.error('Erreur lors du renommage du fichier :', err);
            return res.status(500).json({ error: "Erreur lors du traitement de l'image" });
        }
    }
    if (!code || !intitule || !image) {
        return res.status(400).json({ error: 'Champs manquants pour la création de l\'UE' });
    }
    try {
        const result = await pool.query(
            'INSERT INTO unite_enseignement (code, intitule, image) VALUES ($1, $2, $3) RETURNING *',
            [code, intitule, image]
        );
        // Log d'activité MongoDB
        await logActivity({
            userId: result.id,
            action: 'create ue',
            details: {
                ip: req.ip,
                browser: req.headers['user-agent'],
                ue: code
            }
        });
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Aucune affectation trouvé !" });
    }
};



exports.getUeById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "ID manquant pour récupérer l'unité d'enseignement" });
    }

    try {
        const result = await pool.query(
            'SELECT id, code, intitule, image FROM unite_enseignement WHERE id = $1',
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Unité d'enseignement non trouvée" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de la récupération de l'unité d'enseignement" });
    }
};
