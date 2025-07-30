"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("knex");
const objection_1 = require("objection");
const knexConfig = require('../../knexfile');
const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];
// Inicializa knex y objection
const knexInstance = (0, knex_1.knex)(config);
objection_1.Model.knex(knexInstance);
exports.default = knexInstance;
