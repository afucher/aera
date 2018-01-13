'use strict';
const ClientController = require('../controllers/ClientController');
const Boom = require('boom');
module.exports = [
    {
        method: 'GET',
        path: '/clients',
        handler: ({query}, reply) => {
            let opt = {
                filter: query.query,
                limit : query.limit,
                offset: query.limit * (query.page-1) || 0
            }
            ClientController.getAll(opt)
                .then(courses => reply({data:courses.rows,count:courses.count}));
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
    },
    {
        method: 'PUT',
        path: '/clients/{id}',
        handler: (request, reply) => {
            if(!request.params.id == request.payload.client.id)
                reply(Boom.badData("Invalid ID"));
            ClientController.update(request.payload.client)
                .then((client) => reply(client))
                .catch((err) => reply(err));
        }
    },
    {
        method: 'GET',
        path: '/clients/{id}/groups',
        handler: async (request, reply) => {
            let groups = await ClientController.getAllGroups(request.params.id);
            reply(groups);
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