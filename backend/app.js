const express = require('express');
const cors = require('cors');
const pool = require('./models/db');
require('./models/mongo');
require('dotenv').config();



const logRoutes = require('./routes/log');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const uniteEnseignementRoutes = require('./routes/uniteEnseignement'); // ➕ import de la route UE
const affectationRoutes = require('./routes/affectation'); // ➕ import de la route affectation
const forumRoutes = require('./routes/forum');
const assignmentRoutes = require('./routes/assignmentRoutes');
const assignmentTemplateRoutes = require('./routes/assignmentTemplateRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/ues', uniteEnseignementRoutes); // ➕ ajout de la route UE
app.use('/api/affectations', affectationRoutes); // ➕ ajout de la route affectation
app.use('/uploads', express.static('uploads'));
app.use('/logs', logRoutes);
app.use('/forums', forumRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/assignment-templates', assignmentTemplateRoutes);

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
