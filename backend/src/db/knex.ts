import { knex } from 'knex';
import { Model } from 'objection';
const knexConfig = require('../../knexfile');

const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];

const knexInstance = knex(config);
Model.knex(knexInstance);

export default knexInstance;
