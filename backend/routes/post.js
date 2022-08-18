const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const multer = require("../middleware/multer-config");




router.get('/posts',  postCtrl.getAllPost);
router.put('/like/:id', postCtrl.putLikePost);
router.put('/unlike/:id', postCtrl.putUnlikePost);
router.put('/:id', multer, postCtrl.putPost);
router.put('/comment/:id', postCtrl.putComment);
router.put('/deletecomment/:id', postCtrl.deleteComment);
router.post('/comment/:id', postCtrl.addComment)



module.exports = router;        // exportation pour pouvoir l'importé dans app.Js
