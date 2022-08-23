const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const password = require("../middleware/password")

// Login & infoUser
router.post("/signup",password, userCtrl.signup); // route uniquement (logique importé via controllers)
router.post("/login", password, userCtrl.login);
router.get("/auth", auth, userCtrl.getOneUser);
router.get("/users", auth, userCtrl.getAllUser);
router.put("/follow/:id", auth,  userCtrl.follow);
router.put("/unfollow/:id", auth, userCtrl.unfollow);
router.delete("/:id", auth, userCtrl.deleteUser);

// upload User
router.put("/:id", auth, multer, userCtrl.updateUser);

module.exports = router; // exportation pour pouvoir l'importé dans app.Js
