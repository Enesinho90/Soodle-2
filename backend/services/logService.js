const Log = require('../models/log.model');

async function logActivity({ userId, action, details }) {
    try {
        const log = new Log({
            userId,
            action,
            details
        });
        await log.save();
        console.log("Log enregistré :", action);
    } catch (err) {
        console.error("Erreur lors de l'enregistrement du log", err);
    }
}

module.exports = { logActivity };