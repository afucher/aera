'use strict';
const Payment = require('../models').Payment;
const ClientGroup = require('../models').ClientGroup;
const PaymentController = {};


PaymentController.getAll = ({filter,limit,offset}) => 
    filter? 
    Payment.findAndCountAll({where:{name:{$ilike:'%'+filter+'%'}},limit,offset,order:'due_date'}) : 
    Payment.findAndCountAll({limit,offset,order:'due_date'});
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
