const mongoose=require('mongoose')
/* day2
const bookSchema=new mongoose.Schema({
    bookName: {
        type:String,
        required:true
    },
    authorName: String,
    year:{
        type:Number,
        default:2021
    },
    tags:[String],
    prices:{
        IndianPrice: String,
        europeanPrice: String,
    },
    totalpages:Number
    stockAvailable:Boolean
    

},  {timestamps: true} )

module.exports = mongoose.model('Book1', bookSchema)

*/

const bookSchema=new mongoose.Schema({
     
    name:String,
    author_Id:Number,
    price:Number,
    rating:Number

},
    {timestamps: true} )

module.exports = mongoose.model('newBook', bookSchema)



