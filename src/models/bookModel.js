const mongoose=require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema=new mongoose.Schema({
    
    name:String,
    author:{type: ObjectId, ref:"MyAuthor"},
    price:Number,
    rating:Number

},
    {timestamps: true} )

module.exports = mongoose.model('MyBook', bookSchema)