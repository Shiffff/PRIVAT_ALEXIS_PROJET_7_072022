const Post = require("../models/post"); // importation du model (email + password)

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

exports.putPost = (req, res, next) => {
  Post.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.addComment = (req, res, next) => {
  Post.updateOne(
    { _id: req.params.id },
    {
      $push: {
        comments: {
          commenterId: req.body.commenterId,
          text: req.body.text,
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
    const theComment = data.comments.find((comment) =>
      comment._id.equals(req.body.commentid)
    );

    if (!theComment) return res.status(404).send("Commentaire non trouvé");
    theComment.text = req.body.text;
    return data.save((err) => {
      if (!err) return res.status(200).send(data);
      return res.status(500).send(err);
    });
  });
};

exports.deleteComment = (req, res) => {
  Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentid,
          },
        },
      },
      )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
    } 