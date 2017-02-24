const Joi = require('joi');
const Boom = require('boom');
const User = require('./user.model.js');

//meter promesas

//hapi-auth-jwt2

exports.create = {
    validate: {
        payload: {
            username: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().email(),
            role: Joi.string().optional(),
        }
    },
    handler: (request, reply) => {
        const user = new User(request.payload);
        user.save((err, user) => {
            if (!err) {
                reply(user).created('/user/' + user.id); 
            } else {
                if ( err.code === 11000 || err.code === 11001) {
                    reply(Boom.forbidden());
                } else {
                    console.error('CODE <> 11000 or 11001')
                    reply(Boom.forbidden(err))
                }
            }
        })
    }
}