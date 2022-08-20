const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const multer = require("../middleware/multer-post-config");

router.get("/posts", postCtrl.getAllPost);
router.put("/like/:id", postCtrl.putLikePost);
router.put("/unlike/:id", postCtrl.putUnlikePost);
router.put("/:id", postCtrl.putPost);
router.put("/comment/:id", postCtrl.putComment);
router.put("/deletecomment/:id", postCtrl.deleteComment);
router.post("/comment/:id", postCtrl.addComment);
router.post("/post/:id", multer, postCtrl.addNewPost);
router.delete("/post/:id", postCtrl.deletePost);

module.exports = router; // exportation pour pouvoir l'importé dans app.Js
