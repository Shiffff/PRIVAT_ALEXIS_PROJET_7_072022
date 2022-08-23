const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require("cors"); //Gere le pb de cors (ystème de sécurité qui, par défaut, bloque les appels HTTP entre des serveurs différents)
const userRoutes = require("./routes/user"); // importation des routes users
const postRoutes = require("./routes/post"); // importation des routes users
const path = require("path"); // gére les chemins d'accées au fichier
const helmet = require("helmet"); // définie et peu caché certaines information dans les en-têtes HTTP
const rateLimit = require("express-rate-limit"); //La limitation du débit empêche la même adresse IP de faire trop de demandes


mongoose
  .connect(
    `mongodb+srv://${process.env.ID}:${process.env.PASSWORD}@${process.env.DB_NAME}.mongodb.net/?retryWrites=true&w=majority`, // connection a la base de données
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // limite chaque IP à 100 requêtes par window de 15min
  standardHeaders: true, // retourne l'info de limite dans les headers
  legacyHeaders: false, // désactive le 'X-rateLimit-*' headers
});

app.use(cors());
app.use(express.json()); // Recevoir les réponse json
app.use("/images", express.static(path.join(__dirname, "images"))); // route static pour les images DL
app.use("/postimages", express.static(path.join(__dirname, "postimages")));
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use(helmet());






module.exports = app;
