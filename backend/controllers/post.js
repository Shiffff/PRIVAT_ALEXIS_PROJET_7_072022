const Post = require("../models/post"); // importation du model (email + password)
const fs = require("fs");
const User = require('../models/User');         // importation du model (email + password)



exports.getAllPost = (req, res, next) => {
  Post.find()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

exports.putLikePost = (req, res, next) => {
  Post.updateOne(
    { _id: req.params.id },
    {
      // cherche dans mongoDB le bon ID grace a la fonction uptadeOne et a l'id dans les parametre de requette
      $push: { likers: req.body.id }, // push le nom du user qui a efféctuer le like dans le tableau users ($inc et push sont des commande pour intéragir avec mongoDB)
    }
  )
    .then(() => res.status(201).json({ message: "Ajout du like " }))
    .catch((error) => res.status(400).json({ error }));
};

exports.putUnlikePost = (req, res, next) => {
  Post.updateOne(
    { _id: req.params.id },
    {
      // cherche dans mongoDB le bon ID grace a la fonction uptadeOne et a l'id dans les parametre de requette
      $pull: { likers: req.body.id }, // push le nom du user qui a efféctuer le like dans le tableau users ($inc et push sont des commande pour intéragir avec mongoDB)
    }
  )
    .then(() => res.status(201).json({ message: "Ajout du like " }))
    .catch((error) => res.status(400).json({ error }));
};






exports.putPost = async (req, res, next) => {
  try {
      const post = await Post.findById(req.params.id);
      if (post.posterId === req.auth.userId || req.auth.isAdmin === true) {
        
          await post.updateOne({
              $set: req.body,
          });
          res.status(200).json("Post modifié");
      } else {
          res.status(403).json("Modification refusé");
      }
  } catch (err) {
      res.status(403).json(err);
  }
};









exports.addComment = (req, res, next) => {
  Post.updateOne(
    { _id: req.params.id },
    {
      $push: {
        comments: {
          commenterId: req.body.commenterId,
          text: req.body.text,
          commenterFirstName: req.body.commenterFirstName,
          commenterName: req.body.commenterName,

          timestamp: new Date().getTime(),
        },
      },
    }
  )
    .then(() => res.status(200).json({ message: "Commentaire ajouté !" }))
    .catch((error) => res.status(400).json({ error }));
};







exports.putComment = (req, res, next) => {


  Post.findById(req.params.id, (err, data) => {
    if (req.body.commenterId === req.auth.userId || req.auth.isAdmin === true){
    const theComment = data.comments.find((comment) =>
      comment._id.equals(req.body.commentid)
    );

    if (!theComment) return res.status(404).send("Commentaire non trouvé");
    theComment.text = req.body.text;
    return data.save((err) => {
      if (!err) return res.status(200).send(data);
      return res.status(500).send(err);
    });

  }else{
    res.status(403).json("Modification refusé");
  }

  });
};




exports.deleteComment = (req, res) => {

  if (req.body.commenterId === req.auth.userId || req.auth.isAdmin === true){
  Post.findByIdAndUpdate(req.params.id, {
    $pull: {
      comments: {
        _id: req.body.commentid,
      },
    },
  })
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err }));
}else{res.status(403).json("Modification refusé");}
}





exports.addNewPost = async (req, res, next) => {
  if (req.file) {
    const newPost = new Post({
      posterId: req.params.id,
      message: req.body.message,
      picture: `${req.protocol}://${req.get("host")}/postimages/${
        req.file.filename
      }`,
    });

    try {
      const post = await newPost.save();
      return res.status(201).json(post);
    } catch (error) {
      return res.status(400).send(error);
    }
  } else {
    const newPost = new Post({
      posterId: req.params.id,
      message: req.body.message,
    });

    try {
      const post = await newPost.save();
      return res.status(201).json(post);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};



exports.deletePost = (req, res) => {
  Post.findOne({ _id: req.params.id }).then((post) => {

    if (post.posterId === req.auth.userId || req.auth.isAdmin === true){

    if (post.picture) {
      const filename = post.picture.split("/postimages/")[1];
      fs.unlink(`postimages/${filename}`, () => {
        // Supprime le post sélectionné
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Post supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    } else {
      Post.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Post supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
    }

  }else{
    res.status(403).json("Modification refusé");
  }


});
};
