const controller = require('./controller');

const endpoints = [
    { method: 'POST', path: '/', config: controller.create }
];
module.exports = endpoints;
