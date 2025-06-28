const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    author: {
        id: Number,
        nom: String,
        prenom: String,
        roles: [String]
    },
    content: String,
    createdAt: { type: Date, default: Date.now }
});

const threadSchema = new mongoose.Schema({
    title: String,
    author: {
        id: Number,
        nom: String,
        prenom: String,
        roles: [String]
    },
    createdAt: { type: Date, default: Date.now },
    messages: [messageSchema]
});

const forumSchema = new mongoose.Schema({
    courseId: Number,
    courseTitle: String,
    threads: [threadSchema]
});

module.exports = mongoose.model('Forum', forumSchema);
