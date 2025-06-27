const express = require('express');
const router = express.Router();
const affectationController = require('../controllers/affectationController');

// Récupérer toutes les affectations
router.get('/', affectationController.getAllAffectations);

// Récupérer les affectations d'un utilisateur
router.get('/user/:id', affectationController.getAffectationsByUserId);

// Récupérer toutes les UE d'un utilisateur via les affectations
router.get('/user/:id/ues', affectationController.getUesByUserId);

// Créer une affectation entre un utilisateur et une UE
router.post('/', affectationController.createAffectation);

// Supprimer une affectation entre un utilisateur et une UE
router.delete('/:utilisateur_id/:unite_enseignement_id', affectationController.deleteAffectation);

// (Tu pourras ajouter ici PUT selon les besoins)

module.exports = router;
