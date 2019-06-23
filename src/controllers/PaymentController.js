'use strict';
const moment = require('moment');
const Payment = require('../models').Payment;
const ClientGroup = require('../models').ClientGroup;
const Client = require('../models').Client;
const Group = require('../models').Group;
const Course = require('../models').Course;
const ClientController = require('./ClientController');
const paymentPDF = require('../utils/PaymentsListPDF');
const getMonthDateRange = require('../utils').getMonthDateRange;
const PaymentController = {};
const groupInfo = groupId => {
    if(groupId) return {model:Group,attributes:['id'],where:{id:groupId}, include:{model:Course}};
    return {model:Group,attributes:['id'], include:{model:Course}}
}
const clientInfo = groupId => {return {model: ClientGroup,attributes:['client_id'],include:[{model:Client,attributes:['id','name']},
                                                                        groupInfo(groupId)]}}
const normalizePaymentObject = (payment) => {
    payment['client_id'] = payment.ClientGroup.Client.id;
    payment['name'] = payment.ClientGroup.Client.name;
    payment['course'] = payment.ClientGroup.Group.Course.name;    
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

PaymentController.getAll = ({filter,limit,offset, onlyPending,groupId}) => {
//filter? 
//Payment.findAndCountAll({where:{name:{$ilike:'%'+filter+'%'}},limit,offset,order:'due_date',include:clientInfo}).then(normalizeAllPayments) : 

    let opt = {
        limit,
        offset,
        order:[
            ['due_date'],
            ['installment'],
            [ClientGroup, Client, 'name']
        ],
        include:[clientInfo(groupId)],
        where: {}
    };
    onlyPending = onlyPending == 'true'
    if(onlyPending) opt.where['paid'] = false;
    if(groupId) {
        // opt.include.push({model: ClientGroup, include: {model: Group, where: {id: groupId}}});
    }
    return Payment.findAndCountAll(opt).then(normalizeAllPayments);
}
PaymentController.get = (clientGroup_id, installment) => Payment.findOne( {where:{clientGroup_id, installment}} );
PaymentController.getFromClient = (client_id) => Payment.findAll({
    include: {model:ClientGroup, where:{client_id}, attributes: []}
});
PaymentController.getFromGroup = (group_id) => Payment.findAll({
    include: {model:ClientGroup, where:{group_id}, attributes: []}
});
PaymentController.create = (payment) => Payment.create(payment);
PaymentController.delete = (id) => Payment.destroy({where:{id:id}});

PaymentController.generateReceiptForStudent = async (student_id, month) => {
    let cli = await ClientController.getWithPayments(student_id,month)
    if (!cli) throw require('boom').notFound(`No Payments for this month`);
    cli = cli.get({plain:true})
    let clientPayments = cli.ClientGroups.map( cg => {
        let aux = cg.Payments.map( p => {
            p.Group = cg.Group
            return p;
        });
        return aux;
        
    });
    cli.Payments = require('lodash').cloneDeep([].concat(...clientPayments));
    delete cli.ClientGroups;
    delete cli.Group;
    return paymentPDF(cli);
}

PaymentController.pay = async (clientGroup_id, installment) => {
    try{
        let payment = await Payment.findOne( {where:{clientGroup_id, installment}} );
        if ( !payment ) throw require('boom').notFound(`No payment found`);
        await payment.update({paid:true});
    }catch (e) {
        throw e;
    }
}


PaymentController.getTotalPaymentsForMonths = async (startMonth, months) => {
    let result = [
        {unpaid:0, paid:0},
        {unpaid:0, paid:0},
        {unpaid:0, paid:0}
    ]
    const {start: startDate} = getMonthDateRange(startMonth);
    const {end: endDate} = getMonthDateRange(startMonth+months-1);
    const where = {
        "due_date": {
            $gte : startDate.format('YYYY-MM-DD'),
            $lte : endDate.format('YYYY-MM-DD')
        }
    };

    const payments = await Payment.findAll({
        where
    });
    return payments.reduce((prev, curr) => {
        let indexOfMonth = moment(curr.due_date, "DD/MM/YYYY").month() - startMonth + 1;
        curr.paid ? prev[indexOfMonth].paid += parseFloat(curr.value) : prev[indexOfMonth].unpaid += parseFloat(curr.value);
        return prev;
    },result);

}



module.exports = PaymentController;
