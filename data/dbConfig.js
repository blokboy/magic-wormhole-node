const knex = require('knex');
const knexConfig = require('../knexfile');
const environ = "production";
const db = knex(knexConfig[environ]);

module.exports = db;
