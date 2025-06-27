const bcrypt = require('bcrypt');
const pool = require('../models/db');

async function createUser() {
    const email = 'enes@ap.com';
    const password = 'azerty123';
    const nom = 'UZUN';
    const prenom = 'enes';
    const avatar = 'profil-enes.jpg';
    const roles = JSON.stringify(["ROLE_ADMIN", "ROLE_PROF"]);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
        await pool.query(
            'INSERT INTO utilisateur (email, password, nom, prenom, avatar, roles) VALUES ($1, $2, $3, $4, $5, $6)',
            [email, hashedPassword, nom, prenom, avatar, roles]
        );
        console.log('Utilisateur inséré avec succès !');
        process.exit();
    } catch (err) {
        console.error('Erreur lors de l’insertion :', err);
        process.exit(1);
    }
}

createUser();
