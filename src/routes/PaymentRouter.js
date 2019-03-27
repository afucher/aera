'use strict';
const PaymentController = require('../controllers/PaymentController');
const Boom = require('boom');
module.exports = [
    {
        method: 'GET',
        path: '/payments',
        handler: ({query}, reply) => {
            let opt = {
                filter: query.query,
                limit : query.limit,
                offset: query.limit * (query.page-1) || 0,
                onlyPending: query.onlyPending,
                groupId: query.groupId
            }
            PaymentController.getAll(opt)
                .then(payment => reply({data:payment.rows,count:payment.count}));
        }
    },
    {
        method: 'GET',
        path: '/payments/{id}/{installment}',
        handler: ({params}, reply) => {
            PaymentController.get(params.id, params.installment)
                .then(reply)
                .catch(reply);
        }
    },
    {
        method: 'POST',
        path: '/payments',
        handler: ({payload}, reply) => {
            PaymentController.create(payload)
                .then(reply)
                .catch(err => {
                    reply(handleError(err));
                });
        }
    },
    {
        method: 'DELETE',
        path: '/payments/{id}',
        handler: (request, reply) => {
            PaymentController.delete(request.params.id)
                .then((payment) => reply(payment))
                .catch((err) => reply(err));
        }
    },
    {
        method: 'PUT',
        path: '/payments/{id}',
        handler: (request, reply) => {
            if(!request.params.id == request.payload.payment.id)
                reply(Boom.badData("Invalid ID"));
                PaymentController.update(request.payload.payment)
                .then((payment) => reply(payment))
                .catch((err) => reply(err));
        }
    },
    {
        method: 'POST',
        path: '/payments/{id}/{installment}/pay',
        handler: async ({params}, reply) => {
            try{
                let payment = await PaymentController.pay(params.id, params.installment);
                reply(payment);
            }catch(e) {
                reply(e);
            }
        }
    },
    {
        method: 'GET',
        path: '/payments/totals',
        handler: async ({query}, reply) => {
            try{
                let result = await PaymentController.getTotalPaymentsForMonths(parseInt(query.startMonth), 3)
                reply(result);
            }catch(e) {
                reply(e);
            }
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