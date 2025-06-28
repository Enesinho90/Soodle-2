const Forum = require('../models/forum.model');
const { logActivity } = require('../services/logService');

// 🔍 Obtenir le forum d’un cours
exports.getForumByCourse = async (req, res) => {
    const courseId = parseInt(req.params.courseId);
    try {
        const forum = await Forum.findOne({ courseId });
        if (!forum) {
            return res.status(404).json({ message: "Aucun forum trouvé pour ce cours." });
        }
        // Trie les threads du plus récent au plus ancien
        forum.threads = forum.threads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.json(forum);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur lors de la récupération du forum." });
    }
};

// 🧵 Créer un nouveau sujet (thread)
exports.createThread = async (req, res) => {
    const { courseId } = req.params;
    const { title, courseTitle, nom, prenom, roles, id, messages } = req.body;
    const author = {
        id: id,
        nom: nom || "",
        prenom: prenom || "",
        roles: Array.isArray(roles) ? roles : []
    };

    try {
        let forum = await Forum.findOne({ courseId });

        if (!forum) {
            forum = new Forum({ courseId, courseTitle, threads: [] });
        }

        const newThread = {
            title,
            author,
            messages: Array.isArray(messages) ? messages.map(m => ({
                author: {
                    id: m.author?.id || id,
                    nom: m.author?.nom || nom || "",
                    prenom: m.author?.prenom || prenom || "",
                    roles: Array.isArray(m.author?.roles) ? m.author.roles : []
                },
                content: m.content,
                createdAt: new Date()
            })) : [],
            createdAt: new Date()
        };
        await logActivity({
            userId: author.id,
            action: 'create thread',
            details: {
                ip: req.ip,
                author: author,
                title: title,
                browser: req.headers['user-agent']
            }
        });

        forum.threads.push(newThread);
        await forum.save();

        res.status(201).json({ message: "Sujet créé", thread: newThread });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors de la création du sujet." });
    }
};

// 💬 Ajouter une réponse à un sujet
exports.addMessage = async (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const threadId = req.params.threadId;
    const { content, nom, prenom, roles, id } = req.body;
    const author = {
        id: id,
        nom: nom || "",
        prenom: prenom || "",
        roles: Array.isArray(roles) ? roles : []
    };

    try {
        const forum = await Forum.findOne({ courseId });
        if (!forum) {
            return res.status(404).json({ message: "Forum non trouvé." });
        }

        const thread = forum.threads.id(threadId);
        if (!thread) {
            return res.status(404).json({ message: "Sujet non trouvé." });
        }
        await logActivity({
            userId: author.id,
            action: 'add message to thread',
            details: {
                ip: req.ip,
                thread: threadId,
                author: author,
                browser: req.headers['user-agent']
            }
        });

        thread.messages.push({
            content,
            author,
            createdAt: new Date()
        });

        await forum.save();
        res.status(201).json({ message: "Message ajouté." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors de l’ajout du message." });
    }
};