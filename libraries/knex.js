const knex = require('knex');

const config = require('../env').knex;

module.exports = knex(config);
