const express = require('express');
const cors = require('cors');
const pool = require('./models/db');
require('dotenv').config();

const authRoutes = require('./routes/auth'); // ✅ ici on importe le fichier auth.js

const app = express();
app.use(cors());
app.use(express.json());

// ➕ on ajoute cette ligne pour utiliser la route de login :
app.use('/api/auth', authRoutes);

app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.send(`Connexion à PostgreSQL réussie ! Heure : ${result.rows[0].now}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur de connexion à la base de données");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
