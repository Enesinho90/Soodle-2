const mongoose = require('mongoose');
// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/soodle', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ Connexion à MongoDB réussie'))
    .catch(err => console.error('❌ Erreur de connexion à MongoDB', err));

module.exports = mongoose;