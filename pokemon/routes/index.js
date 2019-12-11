var request = require('request');
var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

//////////////////////////////////////////////////////////

// connect to the database
mongoose.connect('mongodb://localhost:27017/pokemonCreativeProj', {
  useNewUrlParser: true
});

// Create a scheme for items in the db
const itemSchema = new mongoose.Schema({
  id_number: Number,
  pic: String,
});

// Create a model for items in the db
const Item = mongoose.model('Item', itemSchema);

// save a pokemon
router.post('/api/items', async (req, res) => {
    const item = new Item({
        id_number: req.body.number,
        pic: req.body.pic
    });
    try {
        await item.save();
        res.send(item);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// get all saved pokemon
router.get('/api/items', async (req, res) => {
    try {
        let items = await Item.find();
        res.send(items);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// delete a pokemon
router.delete('/api/items/:id_num', async (req, res) => {
    try {
        await Item.deleteOne( { id_number : req.params.id_num } );
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//////////////////////////////////////////////////////////

// the url that points to the 'basic information'
var url = "https://pokeapi.co/api/v2/pokemon";
router.get('/getPokemonInfo', function(req, res) {
    let poke = req.query.p.toLowerCase();
    console.log("interested in learning more about " + poke);
    request(url + "/" + poke).pipe(res);
})

module.exports = router;
