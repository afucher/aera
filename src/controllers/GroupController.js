'use strict';
const CreateGroupList = require('../utils/GroupsListPDF');
const Group = require('../models').Group;
const Client = require('../models').Client;
const Course = require('../models').Course;
const Boom = require('boom');
const fields = ['id','start_date','end_date','start_hour','end_hour','course_id'];
const getOneOptions = {
    include: {
        model: Client, as: 'Students', through: {
            attributes: []
        }, attributes : ['id', 'name']
    },
    attributes : fields
};
const getGroupWithAllInfo = {
    include: [{
        model: Client, as: 'Students', through: {
            attributes: []
        }, attributes : ['id', 'name']
    },{
        model: Course, as: 'Course', attributes: ['name']
    }],
    attributes : fields,
    order: [[{model: Client, as: 'Students'}, 'name']]
};
const getAllOptions = {attributes:fields};

const updateOptions  = (id) => {
    return {
        where: {
            id
        },
        fields:['start_date','end_date','start_hour','end_hour']
    }
}

const GroupController = {};

GroupController.getAll = () => Group.findAll(getAllOptions);
GroupController.get = (id) => Group.findById(id, getOneOptions);
GroupController.create = (group) => Group.create(group);
GroupController.delete = (id) => Group.destroy({ where: { id: id } });
GroupController.update = (group) => Group.update(group,updateOptions(group.id));


GroupController.addStudent = (id, student_id) => {
    return Group.findById(id)
        .then((g) => new Promise((resolve, reject) => {
            if(g){
                g.addStudent(student_id).then(r => r.length > 0 ? resolve(r) : reject(Boom.badRequest(`Student ${student_id} already in Group`)) );
            }else{
                reject(Boom.notFound(`Group ${id} not Found`));
            }
        }));
};

GroupController.getStudents = (id) => Group.findById(id, includeStudents);
GroupController.getGroupList = id => {
    return Group.findById(id,getGroupWithAllInfo)
        .then(CreateGroupList);
}
module.exports = GroupController;
