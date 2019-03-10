const app = require('express')();
const bodyParser = require('body-parser');
const paginate = require('express-paginate')
const cors = require('cors')

var corsOptions = {
    "origin": "*",
    "optionsSuccessStatus": 200
  }

app.use(cors(corsOptions));
app.use(paginate.middleware(10, 50));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

const pokemonController = require('./controllers/pokemon')

app.post('/listpokemon', pokemonController.getAllPokemons);
app.post('/pokemon', pokemonController.insertPokemon);
app.put('/pokemon', pokemonController.updatePokemon);
app.get('/pokemon', pokemonController.getall);

app.listen(3200, () => {
    console.log("rodou");
})