const express = require('express');
const router = express.Router();
//const UserModel= require("../models/userModel")
const bookmodel= require("../models/bookmodel")
const Authormodel= require("../models/authormodel")
//const UserController= require("../controllers/userController")
const bookController= require("../controllers/bookController")
//const authorController= require("../controllers/authorController")



router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

//day1

//router.post('/createNewBook',  UserController.createNewBook  );
//router.get('/getBooks',  UserController.getBooks  );
/*  day2
router.post('/createBook',  bookController.createBook  );
router.get('/getBookslist',  bookController.getBookslist  );

router.post('/getBooksInyear',  bookController.getBooksInyear  );
router.post('/getParticularBooks',  bookController.getParticularBooks );

router.get('/getXINRBooks',  bookController.getXINRBooks  );
router.get('/getRandomBooks',  bookController.getRandomBooks ); */

router.post('/createAuthor',  bookController.createAuthor );
router.post('/createBooks',  bookController.createBooks);
router.get('/authorBooks',  bookController.authorBooks);
router.get('/updatedData',  bookController.updatedData);
router.get('/findBooks',  bookController.findBooks);
router.post('/acceptData',  bookController.acceptData );



module.exports = router;