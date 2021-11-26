const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel")

const UserController= require("../controllers/userController")


router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});


router.get('/getcoins',  UserController.getcoins );


module.exports = router;