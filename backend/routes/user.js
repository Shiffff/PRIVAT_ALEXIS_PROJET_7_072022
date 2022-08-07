const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const password = require('../middleware/password')
const auth = require('../middleware/auth');


router.post('/signup',  userCtrl.signup);    // route uniquement (logique importé via controllers)
router.post('/login', userCtrl.login);      
router.get('/user', auth, userCtrl.getOneUser);



module.exports = router;        // exportation pour pouvoir l'importé dans app.Js
