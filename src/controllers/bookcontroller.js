const mongoose=require('mongoose')

const authorModel=require("../models/authorModel.js")
const bookModel=require("../models/bookModel.js")
const publiserModel=require("../models/publiserModel.js")



const createBook= async function (req, res) {
    let data= req.body;
    let authorId = req.body.author
    let request =  await authorModel.findById(authorId)
    let pubId = req.body.publisher
    let pubRequest = await publiserModel.findById(pubId)

   if(request && pubRequest) {
      let bookCreated = await bookModel.create(data)
      res.send({data: bookCreated})
    }else{
        res.send('The author Id or publiser Id  is not valid')
    }
};



const getBooks = async function(req, res) {
    let allBooks = await bookModel.find().populate('author',{author_name:1,age:1})
    res.send(allBooks)
}

const createPubliser= async function (req, res) {
    let data= req.body
    let publiserCreated= await publiserModel.create(data)
    res.send({data: publiserCreated})    
};


    


module.exports.createBook= createBook;
module.exports.getBooks= getBooks;
module.exports.createPubliser= createPubliser;








/*
const createBook= async function (req, res) {
    let data= req.body;
    let authorId = req.body.author
    let authorFromRequest =  await authorModel.findById(authorId)
    if(authorFromRequest) {
      let bookCreated = await bookModel.create(data)
      res.send({data: bookCreated})
    }else{
        res.send('The author Id provided is nor valid')
    }
};

*/