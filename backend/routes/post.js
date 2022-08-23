const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const multer = require("../middleware/multer-post-config");
const auth = require("../middleware/auth");

router.get("/posts", postCtrl.getAllPost);
router.put("/like/:id", postCtrl.putLikePost);
router.put("/unlike/:id", postCtrl.putUnlikePost);

router.put("/:id", auth, postCtrl.putPost);



router.put("/comment/:id", auth, postCtrl.putComment);
router.put("/deletecomment/:id", auth, postCtrl.deleteComment);
router.post("/comment/:id", postCtrl.addComment);
router.post("/post/:id", multer, postCtrl.addNewPost);
router.delete("/post/:id", auth, postCtrl.deletePost);

module.exports = router; // exportation pour pouvoir l'importé dans app.Js
