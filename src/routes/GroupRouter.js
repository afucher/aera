'use strict';
const GroupController = require('../controllers/GroupController');

module.exports = [
    {
        method: 'GET',
        path: '/groups',
        handler: (request, reply) => {
            GroupController.getAll()
                .then(reply);
                //.then(reply);
        }
    },
    {
        method: 'GET',
        path: '/groups/{id}',
        handler: (request, reply) => {
            GroupController.get(request.params.id)
                .then((group) => reply(group));
        }
    },
    {
        method: 'POST',
        path: '/groups',
        handler: (request, reply) => {
            GroupController.create({description:request.payload.description})
                .then((group) => reply(group));
        }
    },
    {
        method: 'DELETE',
        path: '/groups/{id}',
        handler: (request, reply) => {
            GroupController.delete(request.params.id)
                .then((Group) => reply(Group));
        }
    }
];
