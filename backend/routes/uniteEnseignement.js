const express = require('express');
const router = express.Router();
const uniteEnseignementController = require('../controllers/uniteEnseignementController');

// Récupérer toutes les unités d'enseignement
router.get('/', uniteEnseignementController.getAllUes);
// Créer une unité d'enseignement
router.post('/', uniteEnseignementController.createUe);
// Modifier une unité d'enseignement
router.put('/updateUe', uniteEnseignementController.updateUe);
// Supprimer une unité d'enseignement
router.delete('/:id', uniteEnseignementController.deleteUe);
// recuprer une ue grace à son id
router.get('/:id', uniteEnseignementController.getUeById);
module.exports = router;
