const controller = require('./controller');

const endpoints = [
    { type: 'POST', path: '/user', handler: controller.create }
];
module.exports = endpoints;
