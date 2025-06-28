const { logActivity } = require('../services/logService');

exports.logViewCourse = async (req, res) => {
    const { userId, courseId, courseTitle } = req.body;

    try {
        await logActivity({
            userId,
            action: "view_course",
            details: {
                courseId,
                ip: req.ip,
                courseTitle: courseTitle,
                browser: req.headers['user-agent']
            }
        });
        res.status(200).json({ message: "Log enregistré avec succès" });
    } catch (err) {
        console.error("❌ Erreur lors du log view_course", err);
        res.status(500).json({ message: "Erreur lors de l'enregistrement du log" });
    }
};

exports.logLogout = async (req, res) => {
    const { userId } = req.body;
    try {
        await logActivity({
            userId,
            action: "logout",
            details: {
                ip: req.ip,
                browser: req.headers['user-agent']
            }
        });
        res.status(200).json({ message: "Log de déconnexion enregistré avec succès" });
    } catch (err) {
        console.error("❌ Erreur lors du log logout", err);
        res.status(500).json({ message: "Erreur lors de l'enregistrement du log de déconnexion" });
    }
};