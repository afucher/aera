'use strict';
const ClientController = require('../controllers/ClientController');
const Boom = require('boom');
module.exports = [
    {
        method: 'GET',
        path: '/clients',
        handler: (request, reply) => {
            ClientController.getAll()
                .then(reply);
        }
    },
    {
        method: 'GET',
        path: '/clients/{id}',
        handler: (request, reply) => {
            ClientController.get(request.params.id)
                .then((course) => reply(course));
        }
    },
    {
        method: 'POST',
        path: '/clients',
        handler: ({payload}, reply) => {
            ClientController.create(payload)
                .then(reply)
                .catch(err => {
                    console.log(err.errors);
                    reply(handleError(err));
                });
        }
    },
    {
        method: 'DELETE',
        path: '/clients/{id}',
        handler: (request, reply) => {
            ClientController.delete(request.params.id)
                .then((client) => reply(client))
                .catch((err) => reply(err));
        }
    }
];


const handleError = (err) => {
    let error = null;
    switch(err.errors[0].type){
        case 'unique violation':
            error = Boom.badRequest(err.errors[0].message);
            break;
    }
    return error;
}