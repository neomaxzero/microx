'use strict';

const Hapi = require('hapi');
const Db = require('./app/db');
const config = require('./app/config').server;

const server = new Hapi.Server();
server.connection({
    host: config.host,
    port: config.port
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        return reply('Hello world');
    }
});

server.start((err) => {
    if (err)
        throw err;
    
    console.log('Server running at: ', server.info.uri);
})    

module.exports = server;
