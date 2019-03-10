
exports.up = function (knex, Promise) {
    return Promise.all(
        knex.schema.createTable('pokemon', function (table) {
            table.increments('pokedex').unique();
            table.string('name');
            table.integer('generation');
            table.integer('evolution_stage');
            table.boolean('evolved');
            table.integer('family_id');
            table.boolean('cross_gen');
            table.string('type_one');
            table.string('type_two');
            table.string('weather_one');
            table.string('weather_two');
            table.integer('stat_total');
            table.integer('atack');
            table.integer('defense');
            table.integer('stamina');
            table.boolean('legendary');
            table.integer('aquireable');
            table.boolean('spawns');
            table.boolean('regional');
            table.boolean('raidable');
            table.integer('hatchable');
            table.boolean('shiny');
            table.boolean('nest');
            table.boolean('newpok');
            table.boolean('not_gettable');
            table.boolean('future_evolve');
            table.integer('cem_cp_40');
            table.integer('cem_cp_39');
        })
    );
};

exports.down = function (knex, Promise) {
    return Promise.all(
        knex.schema.dropTable('pokemon')
    );
};
