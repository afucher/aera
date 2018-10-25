'use strict';
const CreateGroupList = require('../utils/GroupsListPDF');
const Group = require('../models').Group;
const Client = require('../models').Client;
const Course = require('../models').Course;
const ClientGroup = require('../models').ClientGroup;
const Payment = require('../models').Payment;
const Boom = require('boom');
const moment = require('moment');
const fields = ['id','start_date','end_date','start_hour','end_hour','course_id','classes','teacher_id','classes'];
const teacher = {model: Client, as: 'Teacher', attributes: ['name']}
const course = {model: Course, as: 'Course', attributes: ['name']}
const getOneOptions = {
    include: [{
        model: Client, as: 'Students', through: {
            attributes: ['attendance']
        }, attributes : ['id', 'name']
    },
    course,
    teacher],
    attributes : fields
};
const getGroupWithAllInfo = {
    include: [{
        model: Client, as: 'Students', through: {
            attributes: []
        }, attributes : ['id', 'name']
    },
    course,
    teacher],
    attributes : fields,
    order: [[{model: Client, as: 'Students'}, 'name']]
};
const getAllOptions = course_id => {
    let opt = {
        attributes:fields,
        include: {
            model: Course
        }};
    if(course_id) opt['where'] = {course_id};
    return opt;
};

const updateOptions  = (id) => {
    return {
        where: {
            id
        },
        fields:['start_date','end_date','start_hour','end_hour']
    }
}

const adjustGroup = group => {
    console.log(group.start_hour);
    if(group.start_hour.length == 5)
            group.start_hour += ":00"
    if(group.end_hour.length == 5)
            group.end_hour += ":00"
    group.start_date = moment(group.start_date, "DD/MM/YYYY",true).format();
    group.end_date = moment(group.end_date, "DD/MM/YYYY",true).format();
    return Promise.resolve(group);
};

const normalizeGroupObject = (group) => {
    group['name'] = group.Course.name;
    delete group.Course;
    return group;
}

const normalizeAllGroup = (groups) => {
    groups.rows = groups.rows.map(item => item.toJSON())
                            .map(normalizeGroupObject);
    return groups;
}

const GroupController = {};
GroupController.getAll = ({filter,limit,offset,course}) => {
    let opt = getAllOptions(course);    
    if (filter){
        opt['filter'] = filter;
        opt['limit'] = limit;
        opt['offset'] = offset;
    };
    return Group.findAndCountAll(opt).then(normalizeAllGroup);
};

GroupController.get = (id) => Group.findById(id, getOneOptions);
GroupController.create = (group) => adjustGroup(group).then(g => Group.create(g));
GroupController.delete = (id) => Group.destroy({ where: { id: id } });
GroupController.update = (group) => adjustGroup(group).then(g => Group.update(g,updateOptions(g.id)));


GroupController.addStudent = (id, student_id) => {
    return Group.findById(id)
        .then((g) => new Promise((resolve, reject) => {
            if(g){
                g.addStudent(student_id,{attendance:0})
                    .then(r => {
                        r.length > 0 ? resolve(r[0]) : reject(Boom.badRequest(`Student ${student_id} already in Group`)) 
                    });
            }else{
                reject(Boom.notFound(`Group ${id} not Found`));
            }
        }));
};

GroupController.unenroll = async (group_id, client_id) => {
    let group = await Group.findById(group_id);
    let client = await Client.findById(client_id);
    return group.removeStudent(client);
};

GroupController.getStudents = (id) => Group.findById(id, includeStudents);
GroupController.getGroupList = id => {
    return Group.findById(id,getGroupWithAllInfo)
        .then(CreateGroupList);
}

GroupController.createPayments = async (id, payment_info) => {
    try{
        const installments = Number(payment_info.installments);
        const due_date_base = moment(payment_info.due_date, "DD/MM/YYYY",true);
        let groups = await Group.findById(id,{ include: {
            model: Client, as: 'Students', through: {
                attributes: ['id']
            }, attributes : ['id']
        }});
        let createdPayments = [];
        groups.Students.forEach(student => {
            Array(installments).fill().map((x,i)=>i+1).forEach(async installment => {
                let header = {
                    clientGroup_id: student.ClientGroup.id,
                    installment
                };
                try{
                    let payment = await Payment.findOne({where:header});
                    if(!payment){
                        let paymentToCreate = {
                            clientGroup_id: header.clientGroup_id,
                            installment: header.installment,
                            value: payment_info.value,
                            due_date: due_date_base.clone().add(header.installment-1, 'M').format()
                        };
                        let created = await Payment.create(paymentToCreate);
                    }
                }catch (error) {
                    console.log(error);
                    return error;
                }
            });
        });
        return createdPayments;
    }catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = GroupController;
