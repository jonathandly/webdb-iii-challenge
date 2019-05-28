const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/lambda.db3',
    },
    useNullAsDefault: true, // needed for sqlite
};

const db = knex(knexConfig);