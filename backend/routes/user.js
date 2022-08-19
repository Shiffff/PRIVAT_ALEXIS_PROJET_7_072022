const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require("../middleware/multer-config");



// Login & infoUser
router.post('/signup',  userCtrl.signup);    // route uniquement (logique importé via controllers)
router.post('/login', userCtrl.login);      
router.get('/auth', auth, userCtrl.getOneUser);
router.get('/users',  userCtrl.getAllUser);
router.put('/follow/:id', userCtrl.follow);
router.put('/unfollow/:id', userCtrl.unfollow);
router.delete('/:id', userCtrl.deleteUser);



// upload User
router.put("/:id", multer, userCtrl.updateUser);



module.exports = router;        // exportation pour pouvoir l'importé dans app.Js
