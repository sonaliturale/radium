const mongoose=require('mongoose')

const publiserSchema=new mongoose.Schema({
    
    name:String,
    headQuarter: String
    

},  {timestamps: true} )

module.exports = mongoose.model('MyPubliser', publiserSchema)