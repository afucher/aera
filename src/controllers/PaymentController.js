'use strict';
const Payment = require('../models').Payment;
const ClientGroup = require('../models').ClientGroup;
const Client = require('../models').Client;
const PaymentController = {};
const clientInfo = {model: ClientGroup,attributes:['client_id'],include:{model:Client,attributes:['id','name']}}
const normalizePaymentObject = (payment) => {
    payment['client_id'] = payment.ClientGroup.Client.id;
    payment['name'] = payment.ClientGroup.Client.name;
    delete payment.ClientGroup;
    return payment;
}

const normalizeAllPayments = (payments) => {
    payments.rows = payments.rows.map(item => item.toJSON())
                            .map(normalizePaymentObject);
    return payments;
}

/*Payment.findAndCountAll({ include:{model: ClientGroup,attributes:['client_id'],include:{model:Client,attributes:['id','name']}}})
    .then(normalizeAllPayments)*/

PaymentController.getAll = ({filter,limit,offset}) => 
    filter? 
    Payment.findAndCountAll({where:{name:{$ilike:'%'+filter+'%'}},limit,offset,order:'due_date',include:clientInfo}).then(normalizeAllPayments) : 
    Payment.findAndCountAll({limit,offset,order:'due_date',include:clientInfo}).then(normalizeAllPayments);
PaymentController.get = (id) => Payment.findById(id);
PaymentController.getFromClient = (client_id) => Payment.findAll({
    include: {model:ClientGroup, where:{client_id}, attributes: []}
});
PaymentController.getFromGroup = (group_id) => Payment.findAll({
    include: {model:ClientGroup, where:{group_id}, attributes: []}
});
PaymentController.create = (payment) => Payment.create(payment);
PaymentController.delete = (id) => Payment.destroy({where:{id:id}});


module.exports = PaymentController;
