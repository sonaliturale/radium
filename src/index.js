const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*
const midGlb = async function (req, res, next) {
    console.log("Hi I am a GLOBAL middleware");
    next()
}

const assignmentMW= async function (req, res, next) {
    let currentdate = new Date();
    let datetime = currentdate.getDate() + " "
                   + (currentdate.getMonth()+1) +" "
                   + currentdate.getFullYear() +" "
                   + currentdate.getHours() + ":"
                   + currentdate.getMinutes() + ":"
                   +currentdate.getSeconds();
    let ip=req.ip
    let url= req.originalUrl
    
    console.log(` ${datetime} ${ip} ${url}   `)

    next()
}

app.use(assignmentMW)
*/



const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://monty-python:SnYUEY4giV9rekw@functionup-backend-coho.0zpfv.mongodb.net/sonaliturale_db?retryWrites=true&w=majority")
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});