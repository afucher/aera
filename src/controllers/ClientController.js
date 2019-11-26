'use strict';
const Client = require('../models').Client;
const Group = require('../models').Group;
const Course = require('../models').Course;
const Payment = require('../models').Payment;
const ClientGroup = require('../models').ClientGroup;
const moment = require('moment');
const certificationPDF = require('../utils/CertificationPDF');
const getMonthDateRange = require('../utils').getMonthDateRange;

const ClientController = {};
const getAllFields = ['id','name','email','cpf'];

const adjust = client => {
    if(client.birth_date)
        client.birth_date = moment(client.birth_date, "DD/MM/YYYY",true).format();
    return Promise.resolve(client);
};

ClientController.getAll = ({filter,limit,offset}) => 
    filter? 
        Client.findAndCountAll({where:{name:{$ilike:'%'+filter+'%'}},limit,offset,order:[['name']],attributes:getAllFields}) : 
        Client.findAndCountAll({limit,offset,order:[['name']], attributes:getAllFields});
ClientController.get = (id) => Client.findByPk(id);
ClientController.create = (client) => Client.create(client);
ClientController.delete = (id) => Client.destroy({where:{id:id}});
ClientController.update = (client) => adjust(client).then(Client.update(client,updateOptions(client.id)));
ClientController.getAllGroups = async id => {
    try {
        let options = {
            include: {model:Group, as: "Groups"},
            attributes: getAllFields
        };
        let client = await Client.findByPk(id,options);
        return client;
    } catch (error) {
        return error;
    }
}
ClientController.getWithPayments2 = id => {
    return Client.findByPk(id,{
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
    return Client.findByPk(id,{
        include: [{
            model: ClientGroup,
            attributes: ['group_id','client_id','id'],
            required: true,
            include : [{
                model : Payment,
                where
            },{
                model : Group,
                include: Course,
                attributes: ['course_id'],
                required: true                
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

    return Client.findByPk(id,{
        include: [{
            model: ClientGroup,
            attributes: ['group_id','client_id','id','attendance'],
            include: [
                {
                    model : Group,
                    include: Course,
                    attributes: ['course_id','classes','start_date','end_date'],
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
                'edu_lvl','birth_date','birth_hour','birth_place','note']
    }
}
