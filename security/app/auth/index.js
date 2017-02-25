'use strict';

const Promise = require('bluebird');
const jwt = require('hapi-auth-jwt2');

const dbUser = require('../user.model.js');

exports.register = (server, options, next) => {
  server.register(jwt, registerAuth);

  function registerAuth (err) {
    if (err) { return next(err); }

    server.auth.strategy('jwt', 'jwt', {
      key: process.env.JWT || 'stubJWT',
      validateFunc: validate,
      verifyOptions: { algorithms: [ 'HS256' ]}
    });

    server.auth.default('jwt');

    return next();
  }

  function validate (decoded, request, cb) {
    return new Promise((resolve) => {
      User.findOne({_id: decoded.id})
      .then((user) => {
        if (!user) {
          return cb(null, false);
        }

        return cb(null, true);
      });
    });
  }
};

exports.register.attributes = {
  name: 'auth-jwt',
  version: '1.0.0'
};
