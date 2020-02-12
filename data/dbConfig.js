const knex = require('knex');
const knexConfig = require('../knexfile');
const environ = "production" || process.env.ENVIRON;
const db = knex(knexConfig[environ]);

module.exports = db;
