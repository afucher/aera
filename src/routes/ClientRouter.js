'use strict';
const ClientController = require('../controllers/ClientController');

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
        handler: (request, reply) => {
            /*ClientController.create({description:request.payload.description})
                .then((client) => reply(client));*/
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
