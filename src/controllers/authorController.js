const mongoose=require('mongoose')

const authorModel=require("../models/authorModel.js")






const createAuthor= async function (req, res) {
    let data= req.body
    let authorCreated= await authorModel.create(data)
    res.send({data: authorCreated})    
};


module.exports.createAuthor= createAuthor;