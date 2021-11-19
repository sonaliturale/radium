const express = require('express');
const router = express.Router();
//const UserModel= require("../models/userModel")
//const UserController= require("../controllers/userController")

//const bookModel= require("../models/bookModel")
//const Authormodel= require("../models/authorModel")
const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")





//Authors Api
router.post('/authors',  authorController.createAuthor  );

//book api
router.post('/books',  bookController.createBook  );

router.get('/books',  bookController.getBooks );

router.post('/publiser',  bookController.createPubliser );




module.exports = router;