'use strict';

const Hapi = require('hapi');
const Db = require('./app/db');
const config = require('./app/config').server;
const endpoints = require('./app/routes');
const auth = require('./app/auth');

console.log('endpoints', endpoints);

const server = new Hapi.Server();



server.connection({
    host: config.host,
    port: config.port
});

server.route(endpoints);

server.start((err) => {
    if (err)
        throw err;

    console.log('Server running at: ', server.info.uri);
})

module.exports = server;
