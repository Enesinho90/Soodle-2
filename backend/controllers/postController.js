const pool = require('../models/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { logActivity } = require('../services/logService');

// Configuration de multer pour l'upload de fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = './uploads/posts';

    // Créer le dossier s'il n'existe pas
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Nom unique : nom-original + timestamp + extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, name + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max
  }
});

// Fonction pour créer un post
exports.createPost = async (req, res) => {
  try {
    console.log('Body reçu:', req.body);
    console.log('Fichier reçu:', req.file);

    const { utilisateur_id, unite_enseignement_id, type, titre, contenu } = req.body;

    let fichierNom = null;
    let fichierPath = null;

    if (req.file) {
      fichierNom = req.file.filename; // Nom original pour affichage
      fichierPath = req.file.path; // Chemin de stockage
    }

    const result = await pool.query(
      `INSERT INTO post (utilisateur_id, unite_enseignement_id, type, titre, contenu, date, fichier)
       VALUES ($1, $2, $3, $4, $5, NOW(), $6)
       RETURNING *`,
      [utilisateur_id, unite_enseignement_id, type, titre, contenu, fichierNom]
    );
    // Log d'activité MongoDB
    await logActivity({
      userId: utilisateur_id,
      action: 'create post',
      details: {
        ip: req.ip,
        browser: req.headers['user-agent'],
        ue: unite_enseignement_id,
        with_file: type
      }
    });

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erreur ajout post :', err);
    res.status(500).json({ error: 'Erreur lors de la création du post' });
  }
};

exports.getPostsByUE = async (req, res) => {
  const { ueId } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM post WHERE unite_enseignement_id = $1 ORDER BY date DESC',
      [ueId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Erreur getPostsByUE :', err);
    res.status(500).json({ error: 'Erreur lors du chargement des posts' });
  }
};



exports.deletePostById = async (req, res) => {
  const { idPost } = req.params
  try {
    const result = await pool.query(
      'DELETE FROM post WHERE id = $1;',
      [idPost]
    );
    // Log d'activité MongoDB
    await logActivity({
      userId: idPost,
      action: 'delete post',
      details: {
        ip: req.ip,
        browser: req.headers['user-agent'],
      }
    });
    res.status(200).json({ message: 'Post supprimé avec succès' });
  } catch (err) {
    console.error('Erreur deletePostById :', err);
    res.status(500).json({ error: 'Erreur lors de la suppression du post' });
  }
}


// Middleware pour l'upload
exports.uploadMiddleware = upload.single('fichier');