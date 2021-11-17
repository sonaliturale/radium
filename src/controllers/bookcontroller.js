const BookModel=require("../models/bookmodel.js")
const mongoose=require('mongoose')
const AuthorModel= require("../models/authormodel.js")







//const mongoose=require('mongoose')
//const bookmodel =require("../models/bookmodel.js")


/*


Assignment: day2 mongoDB
Create a books collection in your DB ( using bookModel with following fields)- bookName( mandatory field), price containing Indian and european price, year ( should be 2021 if no year is provided) , tags array, authorName, totalPages , stockAvailable ( true false)
create the following API’s (write logic in bookController and routes in routes):
createBook : to create a new entry..use this api to create 11+ entries in your collection
bookList : gives all the books- their bookName and authorName only
getBooksInYear: takes year as input in post request and gives list of all books published that year
getParticularBooks:- (this is a good one, make sincere effort to solve this) take any input and use it as a condition to fetch books that satisfy that condition 	
e.g if body had { name: “hi”} then you would fetch the books with this name
if body had { year: 2020} then you would fetch the books with this name
hence the condition will differ based on what you input in the request body
getXINRBooks- request to return all books who have an Indian price tag of “100INR” or “200INR” or “500INR”
getRandomBooks - returns books that are available in stock or have more than 500 pages 



Hints / Solutions:
createBook : 
BookModel.create(book)
bookList :  
BookModel.find().select({ bookName:1, authorName:1})
getBooksInYear: 
find( { year: req.body.year } )
getParticularBooks:-  
BookModel.find( req.body ) 
//this will be sufficient as whatever condition we receive in the body of POST request , we can pass that same condition as JSON filter in the find query 
getXINRBooks-
BookModel.find({ 'prices.indianPrice' : {$in: ["100INR", "200INR", "500INR"] } } )
getRandomBooks - 
BookModel.find({ $or: [ {stockAvailable: true} , { totalPages: {$gt: 500} }   ] } )





const createBook= async function (req, res) {
    const book= req.body
    let savedBook= await BookModel.create(book)
    res.send({msg: savedBook})    
}


const getBookslist= async function (req, res) {
    let allBooks= await BookModel.find().select({bookName:1,authorName:1})
    res.send({msg: allBooks})
}

const getBooksInyear= async function (req, res) {
    let allBooks= await BookModel.find(({year:req.body.year}))
    res.send({msg: allBooks})
}

const getParticularBooks= async function (req, res) {
    let allBooks= await BookModel.find(req.body)
    res.send({msg: allBooks})
}

const getXINRBooks= async function (req, res) {
    let allBooks= await BookModel.find({'prices.indianPrice':{$in:["100INR","200INR","500INR"]}})
    res.send({msg: allBooks})
}

const getRandomBooks= async function (req, res) {
    let allBooks= await BookModel.find({$or:[{stockAvailable:true},{totalPages:{$gt:500}}]})
    res.send({msg: allBooks})
}

module.exports.createBook= createBook
module.exports.getBookslist= getBookslist
module.exports.getBooksInyear= getBooksInyear
module.exports.getParticularBooks= getParticularBooks
module.exports.getXINRBooks= getXINRBooks
module.exports.getRandomBooks= getRandomBooks */


const createBooks= async function (req, res) {
    const books= req.body
    let savedBooks= await BookModel.create(books)
    res.send({msg: savedBooks})    
}


const createAuthor= async function (req, res) {
    const author= req.body
    let savedData= await BookModel.create(author)
    res.send({msg: savedData})    
}


const authorBooks = async function (req, res) {
    let data = await BookModel.find({author_Id:1})
    res.send({msg: data})
}

const updatedData = async function(req, res){
    let savedData = await BookModel.findOne({name:"Two states"}).select({author_Id:1,_Id:0})
    let author = await AuthorModel.find(savedData).select({author_name:1,_Id:0})
    let updatedPrice = await BookModel.findOneAndUpdate({name:"Two states"},{prices:100},{new:true}).select({price:1,_Id:0})
    res.send({msg:author,updatedPrice})
}

const findBooks = async function(req, res){
    let books = await BookModel.find({price:{$gt:49,$lt:101}}).select({author_Id:1,_Id:0})
    let authorNames =  await AuthorModel.find({$or:books}).select({author_name:1,_Id:0})
    res.send({msg:authorNames})
}

const acceptData = async function(req, res){
    let entry = req.body
    if (entry.author_Id==null){
        res.send({msg: "author_Id must be there"})
    }
}





module.exports.createAuthor= createAuthor
module.exports.authorBooks= authorBooks
module.exports.createBooks= createBooks
module.exports.updatedData= updatedData
module.exports.findBooks= findBooks
module.exports.acceptData= acceptData