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
