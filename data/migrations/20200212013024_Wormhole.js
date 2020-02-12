exports.up = function(knex) {
  return knex.schema.createTable('Wormholes', tbl => {
    tbl.increments();
    tbl.boolean('tapped').defaultTo(false);
    tbl.integer('wormhole_id').defaultTo(Math.ceil(Math.random() * 10000000));
    tbl.string('content').notNullable(); 
  });  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Wormholes');
};
