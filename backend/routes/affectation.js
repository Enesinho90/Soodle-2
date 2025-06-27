const express = require('express');
const router = express.Router();
const { getAllAffectations, getAffectationsByUserId, getUesByUserId, createAffectation, deleteAffectation, getUsersByCourseId, getAdminAndProfByCourseId, getAffectationsEtudiantsByCourseId, getEtudiantsByCourseId } = require('../controllers/affectationController');

// Récupérer toutes les affectations
router.get('/', getAllAffectations);

// Récupérer les affectations d'un utilisateur
router.get('/user/:id', getAffectationsByUserId);

// Récupérer toutes les UE d'un utilisateur via les affectations
router.get('/user/:id/ues', getUesByUserId);

// Créer une affectation entre un utilisateur et une UE
router.post('/', createAffectation);

// Supprimer une affectation entre un utilisateur et une UE
router.delete('/:utilisateur_id/:unite_enseignement_id', deleteAffectation);

// Récupérer les profs/admins affectés à un cours
router.get('/users-by-course/:id', getAdminAndProfByCourseId);

// Récupérer les affectations des étudiants d'un cours
router.get('/etudiants-by-course/:id', getAffectationsEtudiantsByCourseId);

// Récupérer les utilisateurs ayant uniquement le rôle ROLE_USER pour un cours donné
router.get('/etudiants-users-by-course/:id', getEtudiantsByCourseId);

module.exports = router;
