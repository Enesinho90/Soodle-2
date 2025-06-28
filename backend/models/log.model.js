const mongoose = require('mongoose');

// Structure d’un log d’activité
const logSchema = new mongoose.Schema({
    userId: Number, // ou String selon ton système
    action: String, // exemple : 'login', 'view_course', etc.
    details: mongoose.Schema.Types.Mixed, // objet JSON libre
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', logSchema);