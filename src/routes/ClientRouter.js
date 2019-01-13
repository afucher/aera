'use strict';
const ClientController = require('../controllers/ClientController');
const PaymentController = require('../controllers/PaymentController');
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
                .then(clients => reply({data:clients.rows,count:clients.count}));
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
    },
    {
        method:'GET',
        path: '/clients/{id}/receipt',
        handler: ({params,query}, reply) => {
            PaymentController.generateReceiptForStudent( params.id , query.month )
                .then(({data,name}) => {
                    reply(data).bytes(data.length).type('application/pdf')
                        .header("Content-Disposition", "attachment; filename=" + name);
                })
                .catch(reply)
        }
    },
    {
        method:'GET',
        path: '/clients/{id}/certification',
        handler: ({params}, reply) => {
            ClientController.generateCertification( params.id)
                .then(({data,name}) => {
                    reply(data).bytes(data.length).type('application/pdf')
                        .header("Content-Disposition", "attachment; filename=" + name);
                })
                .catch(reply)
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