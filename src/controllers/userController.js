const UserModel= require("../models/userModel.js")
const axios = require("axios");
const userModel = require("../models/userModel.js");

const getcoins = async function (req, res){

    try{ 

         let options = {
            header: {
                Authorization: "Bearer ca11c24c-a410-4475-964d-01e672bd2dd4"
            },
          method : "get", 
          url : "http://api.coincap.io/v2/assets",
           
        }
        let response= await axios(options)
        let list= response.data.data
        for (i in list) {
            let cryptoData = {
                symbol:list[i].symbol,
                name:list[i].name,
                marketCapUsd:list[i].marketCapUsd,
                priceUsd:list[i].priceUsd,
            } 
            await userModel.create(cryptoData)
        }
        list.sort(function (a,b){return (a.changePercent24Hr) - (b.changePercent24Hr)})
                
        res.status(200).send( {msg: "Success", data: list} )

    }
    catch(err) {
        console.log(err.message)
        res.status(500).send( { msg: "Something went wrong" } )
    }
}
module.exports.getcoins= getcoins