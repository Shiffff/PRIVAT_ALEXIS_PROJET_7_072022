const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const multer = require("../middleware/multer-config");




router.get('/posts',  postCtrl.getAllPost);
router.put('/like/:id', postCtrl.putLikePost);
router.put('/unlike/:id', postCtrl.putUnlikePost);
router.put('/:id', multer, postCtrl.putPost);








module.exports = router;        // exportation pour pouvoir l'importé dans app.Js
