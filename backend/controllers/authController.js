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
    const { id, nom, prenom, email } = req.body;
    try {
        // Vérifier si l'email est déjà utilisé par un autre utilisateur
        const emailExists = await pool.query('SELECT id FROM utilisateur WHERE email = $1 AND id != $2', [email, id]);
        if (emailExists.rows.length > 0) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé par un autre utilisateur.' });
        }
        // Mettre à jour le profil
        const result = await pool.query(
            'UPDATE utilisateur SET nom = $1, prenom = $2, email = $3 WHERE id = $4 RETURNING id, email, nom, prenom, roles, avatar',
            [nom, prenom, email, id]
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
