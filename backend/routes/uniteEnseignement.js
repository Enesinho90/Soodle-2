const express = require('express');
const router = express.Router();
const uniteEnseignementController = require('../controllers/uniteEnseignementController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // dossier où seront stockées les images


// Récupérer toutes les unités d'enseignement
router.get('/', uniteEnseignementController.getAllUes);
// Pour la création d'une UE avec image
router.post('/', upload.single('image'), uniteEnseignementController.createUe);
// Modifier une unité d'enseignement (accepte aussi un fichier)
router.put('/updateUe', upload.single('image'), uniteEnseignementController.updateUe);
// Supprimer une unité d'enseignement
router.delete('/:id', uniteEnseignementController.deleteUe);
// recuprer une ue grace à son id
router.get('/:id', uniteEnseignementController.getUeById);
module.exports = router;
