/*
  Here is where we define the shape of the DB tables using knex as our ORM.
  This is the skeleton for the User model which is the most general abstraction in most 
  of my backend work.
*/

exports.up = function(knex) {
  return knex.schema.createTable('Users', tbl => {
    tbl.increments(); // DoNt AuToInCrEmEnT uSeR iDs -- I know pls stfu.
    tbl.boolean('confirmed').defaultTo(false);
    tbl.string('first_name', 128).notNullable();
    tbl.string('last_name', 128).notNullable();
    tbl.string('email', 256).notNullable().unique();
    tbl.string('password', 128).notNullable();
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Users');
};
