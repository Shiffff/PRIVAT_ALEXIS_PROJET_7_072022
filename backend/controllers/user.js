const User = require('../models/User');         // importation du model (email + password)
const bcrypt = require('bcrypt');               // Utilisation du plugin bcrypt
const jwt = require('jsonwebtoken');            // Importation du plugin de génération token      
const fs = require('fs');

require('dotenv').config();



exports.signup = (req, res, next) => {      // logique de la route signup avant exportation dans le routeur
    bcrypt.hash(req.body.password, 10)      // utilisation du plugin bcrypt (créer un hash du password (utilisation de l'algo 15 fois = salage du mot de passe))
    .then(hash => {  
        delete req.body.passwordCheck;                       // recupération du hash pour :
        const user = new User({             // nouvelle instance du schema user
            email: req.body.email,          // séléction du champ "email" dans le body de la requete
            password: hash,
            name: req.body.name,
            firstName: req.body.firstName                                // Séléction du hash ( le password n'est pas stocké)
        });
        user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))        // Status 201 = création de ressource
            .catch(error => res.status(400).json({ error }));
    })                                      
    .catch(error => res.status(500).json({ error }));       // si err
};


exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email}) //User findOne permet de ne séléctionner qu'un élément du schema présent dans mongo atlas et req body email séléctionne les données  du champ saisie
    .then(user => {                        // Si 'user' appeler et retrouver dans la base de donnée
        if (user === null) {            
            res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte'});   
        }else{                              // sinon(l'utilisateur existe dans la base de donnée donc:)
            bcrypt.compare(req.body.password, user.password)    // Comme le mot de passe n'est pas enregistré (uniquement le hash et que l'on utilise un algorytme non réversible )
            .then(valid => {
                if (!valid){                                    // Si la réponse n'est pas valid (les deux hashs ne correspondent pas)
                    res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte'})
                }else{                                          // Si les hash correspondent
                    res.status(200).json({                          // Si valid :
                        userId: user._id,                           // renvoie le user id généré par mongoDB + un token
                        token: jwt.sign(                            //  création du TOKEN
                            { userId: user._id },                   // premier argument séléction de la chose a encodé ici l'id généré par mongo DB cela permet de fixer des droits par rapport a un utilisateur
                            `${process.env.KEY}`,         // clé secrete pour l'encodage
                            { expiresIn: '24h' }                    // expiration en 24h
                        )
                    });
                }
            })                                             // Nous devons comparer les deux hash pour valider l'authentification
            .catch(error => res.status(500).json({ error }));
        }
    })
    .catch(error => res.status(500).json({ error }));
};



exports.getOneUser = (req, res, next) => {                  //get une seul sauce éxistantes
    User.findOne({ _id: req.auth.userId}) 
    .select('-password')                       // find dans la base de données le schema qui correspond a l'id qui ce trouve dans la requete
    .then(User => {
        res.status(200).json(User)})                 // renvoie en format json la reponse (all schema) qui sera traduite côté front
    .catch(error => res.status(400).json({ error }));
  };

  
  exports.updateUser = (req, res, next) => {
    const userObject = req.file
      ? {
          ...req.body.user,
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body };
    User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
      .then(() => {
        res.status(200).json({ message: "Informations utilisateur modifiées" });
      })
      .catch((err) => res.status(404).json({ err }));
  };


  exports.getAllUser = (req, res, next) => {
    User.find()
    .select('-password')                                                      
    .then(users => res.status(200).json(users))               
    .catch(error => res.status(400).json({ error }));
  };



  exports.follow = (req, res, next) => {
    User.updateOne({ _id: req.params.id }, {  // cherche dans mongoDB le bon ID grace a la fonction uptadeOne et a l'id dans les parametre de requette
      $push: { following: req.body.idToFollow  }  // push le nom du user qui a efféctuer le like dans le tableau users ($inc et push sont des commande pour intéragir avec mongoDB)
  })
  .then(console.log)
  User.updateOne({ _id: req.body.idToFollow }, {  // cherche dans mongoDB le bon ID grace a la fonction uptadeOne et a l'id dans les parametre de requette
    $push: { followers: req.params.id  }  // push le nom du user qui a efféctuer le like dans le tableau users ($inc et push sont des commande pour intéragir avec mongoDB)
})
.then(() => res.status(201).json({ message: 'Ajout du like '}))
.catch(error => res.status(400).json({ error }));
};
  


  exports.unfollow = async (req, res, next) => {

    User.updateOne({ _id: req.params.id }, {  // cherche dans mongoDB le bon ID grace a la fonction uptadeOne et a l'id dans les parametre de requette
      $pull: { following: req.body.idToFollow  }  // push le nom du user qui a efféctuer le like dans le tableau users ($inc et push sont des commande pour intéragir avec mongoDB)
  })
  .then(console.log)
  User.updateOne({ _id: req.body.idToFollow }, {  // cherche dans mongoDB le bon ID grace a la fonction uptadeOne et a l'id dans les parametre de requette
    $pull: { followers: req.params.id  }  // push le nom du user qui a efféctuer le like dans le tableau users ($inc et push sont des commande pour intéragir avec mongoDB)
})
.then(() => res.status(201).json({ message: 'Ajout du like '}))
.catch(error => res.status(400).json({ error }));
};




exports.deleteUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
  .then(user => {
    if (user.imageUrl) {
      const filename = user.imageUrl.split('/images/')[1];
      if(filename === "user_default.jpg"){      
        User.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'User supprimé !' }))
      .catch(error => res.status(400).json({ error }))
}
     else {
      const filename = user.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        // Supprime le post sélectionné
        User.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'User supprimé !' }))
          .catch(error => res.status(400).json({ error }))
      })
    }
    }})
  }
