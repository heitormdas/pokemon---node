const config = require("../knexfile");
const knex = require('knex')(config);
const paginate = require('express-paginate');

exports.insertPokemon = (req, res, next) => {
    knex('pokemon').insert(req.body.pokemon)
        .then(response => res.json({ response }))
        .catch(error => res.status(404).json({ error }))
}

exports.updatePokemon = (req, res, next) => {
    knex('pokemon').where('pokedex', '=', req.body.pokemon.pokedex)
        .update(req.body.pokemon)
        .then(response => res.json({ response }))
        .catch(error => res.status(404).json({ error }))
}

exports.getAllPokemons = (req, res, next) => {
    const filters = req.body.filters;
    var limit = req.query.limit || 10;
    var skip = req.query.page && req.query.page == 1 ? 0 : (req.query.page - 1) * limit;

    let query = knex('pokemon').count('pokedex  as count');

    if (filters) {
        Object.keys(filters).forEach(key => {
            if (filters[key]) {
                if (typeof filters[key] == 'string') {
                    query.toString().includes('where') ? query.where(key, 'like', `%${filters[key]}%`) : query.andWhere(key, 'like', `%${filters[key]}%`);
                } else {
                    query.toString().includes('where') ? query.where(key, '=', filters[key]) : query.andWhere(key, '=', filters[key]);
                }
            }
        })
    }

    query.then(response => {
        const itemCount = response[0].count;
        let query = knex.select('*').from('pokemon')

        if (filters) {

            Object.keys(filters).forEach(key => {
                if (filters[key]) {
                    if (typeof filters[key] == 'string') {
                        query.toString().includes('where') ? query.where(key, 'like', `%${filters[key]}%`) : query.andWhere(key, 'like', `%${filters[key]}%`);
                    } else {
                        query.toString().includes('where') ? query.where(key, '=', filters[key]) : query.andWhere(key, '=', filters[key]);
                    }
                }
            })
        }

        query.limit(limit).offset(skip).then(pokemons => {
            const pageCount = Math.ceil(itemCount / limit);
            data = {
                pokemon: pokemons,
                pageCount: pageCount,
                itemCount: itemCount,
                pages: null
            }
            data.pages = paginate.getArrayPages(req)(itemCount, data.pageCount, req.query.page);
            res.json(data);
        }).catch(error => res.status(404).json(error));
    }).catch(error => res.status(404).json(error));
};

exports.getall = (req, res) => {
    knex().from('pokemon')
        .then(x => res.json({ x }))
}