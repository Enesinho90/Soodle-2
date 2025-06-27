const express = require('express');
const router = express.Router();
const affectationController = require('../controllers/affectationController');

// Récupérer toutes les affectations
router.get('/', affectationController.getAllAffectations);

// (Tu pourras ajouter ici POST, PUT, DELETE selon les besoins)

module.exports = router;
