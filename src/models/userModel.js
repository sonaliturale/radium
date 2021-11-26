const mongoose=require('mongoose')
const axios = require("axios");

const coinsSchema=new mongoose.Schema({
    symbol: {
        type: String,
        unique: true,
            },
    name: {
            type: String,
            unique: true,
            },
    marketCapUsd:String ,
    priceUsd:  String,            
    

}, {timestamps: true} )

module.exports=mongoose.model('coins',coinsSchema)

