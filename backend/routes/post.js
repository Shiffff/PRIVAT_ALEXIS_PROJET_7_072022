const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');



router.get('/posts',  postCtrl.getAllPost);
router.put('/like/:id', postCtrl.putLikePost)
router.put('/unlike/:id', postCtrl.putUnlikePost)









module.exports = router;        // exportation pour pouvoir l'importé dans app.Js
