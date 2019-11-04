var request = require('request');
var express = require('express');
var router = express.Router();

// the url that points to the 'basic information'
var url = "https://pokeapi.co/api/v2/pokemon";

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/pokeCount', function(req, res) {
    request(url).pipe(res);
});

router.get('/getPokemonInfo', function(req, res) {
    let poke = req.query.p.toLowerCase();
    console.log("interested in learning more about " + poke);
    request(url + "/" + poke).pipe(res);
})

module.exports = router;
