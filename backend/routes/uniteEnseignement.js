const express = require('express');
const router = express.Router();
const uniteEnseignementController = require('../controllers/uniteEnseignementController');

// Récupérer toutes les unités d'enseignement
router.get('/', uniteEnseignementController.getAllUes);
// Modifier une unité d'enseignement
router.put('/updateUe', uniteEnseignementController.updateUe);
// Supprimer une unité d'enseignement
router.delete('/:id', uniteEnseignementController.deleteUe);

module.exports = router;
