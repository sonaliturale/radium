const UserModel= require("../models/userModel.js")
const axios = require("axios");



const getTemp = async function (req, res){

    try{ 
        
         let options = {
          method : "get",
          url : `http://api.openweathermap.org/data/2.5/weather?q=London&appid=e0b49114e825916cfc8e273a116cd003`,
          
        };
        let response= await axios(options)
        
        
        res.status(200).send( {msg: "Success", "data":response.data.main.temp} );

    }
    catch(err) {
        console.log(err.message)
        res.status(500).send( { msg: "Something went wrong" } )
    }
};




const Londontemp = async function (req, res){

    try{ 
    
        let cities  =  ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let cityObjArray = [];
        let length = cities.length
        for(let i=0; i<length; i++){
            let obj = {city: cities[i]}
            let resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=e0b49114e825916cfc8e273a116cd003`)
            console.log(resp.data.main.temp)
            obj.temp= resp.data.main.temp

            cityObjArray.push(obj);
        }
        let sorted = cityObjArray.sort(  function(a, b) { return a.temp - b.temp } )
        console.log(sorted)
        res.status(200).send( {status: true, data: sorted} )

    }
    catch(err) {
        console.log(err.message)
        res.status(500).send( { msg: "Something went wrong" } )
    }
}

module.exports.getTemp = getTemp;
module.exports.Londontemp = Londontemp;
