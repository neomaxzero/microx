const controller = require('./controller');
const endpoints = [
    { method: 'POST', path: '/user', config: controller.create },
    { method: 'GET', path: '/user', config: controller.getAll }
];
module.exports = endpoints;
