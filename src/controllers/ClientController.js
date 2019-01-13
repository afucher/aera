'use strict';
const Client = require('../models').Client;
const Group = require('../models').Group;
const Course = require('../models').Course;
const Payment = require('../models').Payment;
const ClientGroup = require('../models').ClientGroup;
const moment = require('moment');
const certificationPDF = require('../utils/CertificationPDF');

const ClientController = {};
const getAllFields = ['id','name','email','cpf'];

const adjust = client => {
    if(client.birth_date)
        client.birth_date = moment(client.birth_date, "DD/MM/YYYY",true).format();
    return Promise.resolve(client);
};

ClientController.getAll = ({filter,limit,offset}) => 
    filter? 
        Client.findAndCountAll({where:{name:{$ilike:'%'+filter+'%'}},limit,offset,order:'name',attributes:getAllFields}) : 
        Client.findAndCountAll({limit,offset,order:'name', attributes:getAllFields});
ClientController.get = (id) => Client.findById(id);
ClientController.create = (client) => Client.create(client);
ClientController.delete = (id) => Client.destroy({where:{id:id}});
ClientController.update = (client) => adjust(client).then(Client.update(client,updateOptions(client.id)));
ClientController.getAllGroups = async id => {
    try {
        let options = {
            include: {model:Group, as: "Groups"},
            attributes: getAllFields
        };
        let client = await Client.findById(id,options);
        return client;
    } catch (error) {
        return error;
    }
}
ClientController.getWithPayments2 = id => {
    return Client.findById(id,{
        include: [{
            model: Payment, as: 'Payments', through: {
                attributes: ['id'],
                include: [{
                    model: Group,
                    as: 'Group',
                    include : [{model: Course }]
                }]
            }
            
        }],attributes:['name']
    });
}

ClientController.getWithPayments = (id,month) => {
    let where = {paid : false};
    if(month){
        let dateRange = getMonthDateRange(month);
        where["due_date"] = {
            $lte : dateRange.end.format('YYYY-MM-DD')
        };
    }
    return Client.findById(id,{
        include: [{
            model: ClientGroup,
            attributes: ['group_id','client_id','id'],
            include : [{
                model : Payment,
                where
            },{
                model : Group,
                include: Course,
                attributes: ['course_id']
            }]
        }],
        attributes: ['name']
    });
}

ClientController.getFinishedGroupsWithAttendance = id => {
    const where = {
        end_date : {
            $lte : moment().format('YYYY-MM-DD')
        }
    };

    return Client.findById(id,{
        include: [{
            model: ClientGroup,
            attributes: ['group_id','client_id','id','attendance'],
            include: [
                {
                    model : Group,
                    include: Course,
                    attributes: ['course_id','classes'],
                    where
                }
            ],
        }],
        attributes: ['name']
    });
}

ClientController.generateCertification = id => {
    return ClientController.getFinishedGroupsWithAttendance(id).then(certificationPDF)
}

module.exports = ClientController;

const updateOptions = (id) => {
    return {
        where: {
            id
        },
        fields:['name','email','cpf','phone','cel_phone','com_phone','address1','address2','address3','zip_code','city','state','profession','teacher',
                'edu_lvl','birth_date','birth_hour','birth_place']
    }
}

const getMonthDateRange = (month) => {
    // month in moment is 0 based, so 9 is actually october, subtract 1 to compensate
    // array is 'year', 'month', 'day', etc
    var startDate = moment().utc().month(month-1).startOf('month');

    // Clone the value before .endOf()
    var endDate = moment(startDate).endOf('month');

    // make sure to call toDate() for plain JavaScript date type
    return { start: startDate, end: endDate };
}