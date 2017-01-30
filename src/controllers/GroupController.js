'use strict';
const Group = require('../models').Group;
const Client = require('../models').Client;
const Boom = require('boom');

const includeStudents = {
    include: {
        model: Client, as: 'Students', through: {
            attributes: []
        }
    }
}

const GroupController = {};

GroupController.getAll = () => Group.findAll(includeStudents);
//GroupController.get = (id) => Group.findById(id);
GroupController.get = (id) => Group.findById(id, includeStudents);
GroupController.create = (group) => Group.create(group);
GroupController.delete = (id) => Group.destroy({ where: { id: id } });
/*GroupController.addStudent = (id, student_id) => {
    Group.findById(id)
        .then(g => g ? g.addStudent(student_id) : '');
};*/

GroupController.addStudent = (id, student_id) => {
    return Group.findById(id)
        .then((g) => new Promise((resolve, reject) => {
            if(g){
                resolve(g.addStudent(student_id));
            }else{
                reject(Boom.notFound(`Group ${id} not Found`));
            }
        }));
};

GroupController.getStudents = (id) => Group.findById(id, includeStudents);
module.exports = GroupController;
