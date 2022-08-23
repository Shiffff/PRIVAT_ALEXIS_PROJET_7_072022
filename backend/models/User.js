const mongoose = require('mongoose');   // Appel de mongoose pour crée un nouveau schema (schema email + password)
const uniqueValidator = require('mongoose-unique-validator');   // Appel de mongoose-unique-validator pour certifié que deux même adresse email ne puisse pas etre enregistré


const userSchema = mongoose.Schema({            // Nouveau schema email + password require et  unique pour l'addresse email
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    firstName: { type: String, required: true },
    imageUrl: { type: String, default: "http://localhost:3000/images/user_default.jpg"},
    bio:{type: String, default: "Ecrivez votre bio ici"},
    followers:{type:[String]},
    following:{type:[String]},
    isAdmin: { type: Boolean, default:false}
},
{timestamps: true,}
);


userSchema.plugin(uniqueValidator);


module.exports = mongoose.model('User', userSchema);            // On exporte ce nouveaux schema en tant que model