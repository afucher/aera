'use strict';
const GroupController = require('../controllers/GroupController');
const GroupValidation = require('../validation_schemas/Group');
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
        handler: ({payload}, reply) => {
            GroupController.create(payload)
                .then((group) => reply(group))
                .catch((err) => {
                    reply(err);
                });
        },
        config: {
            validate: {
                payload : GroupValidation
            }
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
