const express = require('express');

const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
router.get('/movies', function (req, res) {
    res.send('[Rockstar, DDLD, vivah]')
});

//router.get('/movies/:movieIndex' , function (req, res) {
   // let movies = ["Rockstar", "DDLD", "vivah"]
    //let index = req.params.movieIndex
   // let movieAtIndex = movies[index]
   // res.send(movieAtIndex)

//});


router.get('/movies/:movieIndex' ,function (req, res) {
 let movies = ["Rockstar", "DDLD", "vivah"]
 let value = req.params.movieIndex
 if (value >= movies.length){
    res.send("use a valid index")
}else{
    res.send(movies[value])
}

});


router.get('/films' ,function (req, res) {
    let moviesobjects = [{"Id":1 , "name":"The shining"},{"Id":2 , "name": "Incendies"},{"Id":3 , "name": "Rang de Basanti"},{"Id":4 , "name": "Finding Demo"}]
    res.send(moviesobjects)
});

router.get('/films/:filmsId' ,function (req, res) {
      let films = [{"Id":1 , "name":"The shining"},{"Id":2 , "name": "Incendies"},{"Id":3 , "name": "Rang de Basanti"},{"Id":4 , "name": "Finding Demo"}]
      let value = req.params.filmsId
      if(value >= films.length){
      res.send("no movies exits")
}else{
    res.send(films[value])
}


});


   



module.exports = router;