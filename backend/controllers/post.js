const Post = require('../models/post');         // importation du model (email + password)



exports.getAllPost = (req, res, next) => {
    Post.find()
    .then(posts => res.status(200).json(posts))               
    .catch(error => res.status(400).json({ error }));
  };

  exports.putLikePost = (req, res, next) => {
    Post.updateOne({ _id: req.params.id }, {  // cherche dans mongoDB le bon ID grace a la fonction uptadeOne et a l'id dans les parametre de requette
      $push: { likers: req.body.id  }  // push le nom du user qui a efféctuer le like dans le tableau users ($inc et push sont des commande pour intéragir avec mongoDB)
  })
.then(() => res.status(201).json({ message: 'Ajout du like '}))
.catch(error => res.status(400).json({ error }));
};

exports.putUnlikePost = (req, res, next) => {
  Post.updateOne({ _id: req.params.id }, {  // cherche dans mongoDB le bon ID grace a la fonction uptadeOne et a l'id dans les parametre de requette
    $pull: { likers: req.body.id  }  // push le nom du user qui a efféctuer le like dans le tableau users ($inc et push sont des commande pour intéragir avec mongoDB)
})
.then(() => res.status(201).json({ message: 'Ajout du like '}))
.catch(error => res.status(400).json({ error }));
};


