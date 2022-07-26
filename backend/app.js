const express = require('express')
const app = express();
const mongoose = require('mongoose');
var cors = require('cors')      //Gere le pb de cors (ystème de sécurité qui, par défaut, bloque les appels HTTP entre des serveurs différents)
const userRoutes = require('./routes/user');     // importation des routes users
const path = require('path');       // gére les chemins d'accées au fichier


mongoose.connect(`mongodb+srv://shiffff:OZq5LXfMjLUyJreS@project6.mrxapko.mongodb.net/?retryWrites=true&w=majority`,      // connection a la base de données
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));




app.use(cors());
app.use(express.json());        // Recevoir les réponse json
app.use('/images', express.static(path.join(__dirname, 'images')));       // route static pour les images DL
app.use('/api/auth', userRoutes);

module.exports = app;