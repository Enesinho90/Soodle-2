const pool = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM utilisateur WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Email incorrect' });
        }

        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        // Générer un token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, roles: user.roles },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({
            message: 'Connexion réussie',
            token,
            user: {
                id: user.id,
                email: user.email,
                nom: user.nom,
                prenom: user.prenom,
                roles: user.roles,
                avatar: user.avatar,
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

exports.register = async (req, res) => {
    const { email, password, nom, prenom, roles } = req.body;
    const avatar = "avatar-default.jpg"; // avatar par défaut
    try {
        // Vérifier si l'utilisateur existe déjà
        const userExists = await pool.query('SELECT * FROM utilisateur WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }
        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
        // Insérer le nouvel utilisateur avec roles et avatar

        const result = await pool.query(
            'INSERT INTO utilisateur (email, password, nom, prenom, roles, avatar) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, email, nom, prenom, roles, avatar',
            [email, hashedPassword, nom, prenom, JSON.stringify(roles), avatar]
        );
        const user = result.rows[0];
        res.status(201).json({
            message: 'Compte créé avec succès',
            user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur lors de la création du compte" });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        let { id, nom, prenom, mail } = req.body;
        // Correction : certains navigateurs envoient 'email', d'autres 'mail'
        const email = mail || req.body.email;
        // Si un fichier est uploadé
        let avatarFileName = null;
        if (req.file) {
            const extension = req.file.originalname.split('.').pop();
            avatarFileName = `avatar_${id}.${extension}`;
            const fs = require('fs');
            const path = require('path');
            const oldPath = req.file.path;
            const newPath = path.join('uploads', avatarFileName);
            // Renommer le fichier uploadé
            fs.renameSync(oldPath, newPath);
            // Mettre à jour l'avatar en BDD
            await pool.query('UPDATE utilisateur SET avatar = $1 WHERE id = $2', [avatarFileName, id]);
        }
        // Vérifier si l'email est déjà utilisé par un autre utilisateur
        const emailExists = await pool.query('SELECT id FROM utilisateur WHERE email = $1 AND id != $2', [email, id]);
        if (emailExists.rows.length > 0) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé par un autre utilisateur.' });
        }
        // Mettre à jour le profil (hors avatar)
        const result = await pool.query(
            'UPDATE utilisateur SET nom = $1, prenom = $2, email = $3 WHERE id = $4 RETURNING id, email, nom, prenom, roles, avatar',
            [nom, prenom, email, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.json({
            message: avatarFileName ? 'Profil et avatar mis à jour avec succès' : 'Profil mis à jour avec succès',
            user: result.rows[0]
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur lors de la modification du profil" });
    }
};

exports.changePassword = async (req, res) => {
    const { id, oldPassword, newPassword } = req.body;
    try {
        // Récupérer l'utilisateur
        const result = await pool.query('SELECT * FROM utilisateur WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        const user = result.rows[0];
        // Vérifier l'ancien mot de passe
        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Ancien mot de passe incorrect.' });
        }
        // Hasher le nouveau mot de passe
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        // Mettre à jour le mot de passe
        await pool.query('UPDATE utilisateur SET password = $1 WHERE id = $2', [hashedPassword, id]);
        res.json({ message: 'Mot de passe modifié avec succès.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur lors du changement de mot de passe" });
    }
};

exports.updateProfileAdmin = async (req, res) => {
    const { id, nom, prenom, email, roles } = req.body;
    try {
        // Vérifier si l'email est déjà utilisé par un autre utilisateur
        const emailExists = await pool.query('SELECT id FROM utilisateur WHERE email = $1 AND id != $2', [email, id]);
        if (emailExists.rows.length > 0) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé par un autre utilisateur.' });
        }
        // Mettre à jour le profil et les rôles
        const result = await pool.query(
            'UPDATE utilisateur SET nom = $1, prenom = $2, email = $3, roles = $4 WHERE id = $5 RETURNING id, email, nom, prenom, roles, avatar',
            [nom, prenom, email, JSON.stringify(roles), id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.json({
            message: 'Profil mis à jour avec succès',
            user: result.rows[0]
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur lors de la modification admin du profil" });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT id, email, nom, prenom, roles, avatar FROM utilisateur');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur lors de la récupération des utilisateurs" });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM utilisateur WHERE id = $1 RETURNING id', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.json({ message: 'Utilisateur supprimé avec succès', id: result.rows[0].id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur lors de la suppression de l'utilisateur" });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT id, email, nom, prenom, roles, avatar FROM utilisateur WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur lors de la récupération de l'utilisateur" });
    }
};
