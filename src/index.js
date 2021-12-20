const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const midglobal = function (req, res, next) {
    console.log(`${new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDay() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()} ${req.ip} ${req.originalUrl}`);
    next();
}
app.use(midglobal);


const mongoose = require('mongoose')
//single db and branch for the project purpose
//mongoose.connect("mongodb+srv://user-open-to-all:hiPassword123@cluster0.xgk0k.mongodb.net/group9DAtaBase?authSource=admin&replicaSet=atlas-e7145j-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true", { useNewUrlParser: true })
mongoose.connect("mongodb+srv://monty-python:SnYUEY4giV9rekw@functionup-backend-coho.0zpfv.mongodb.net/sonaliturale_db?retryWrites=true&w=majority", { useNewUrlParser: true })  

.then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});