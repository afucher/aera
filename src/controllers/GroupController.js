'use strict';
const Group   = require('../models').Group;
const Student = require('../models').Student;

const GroupController = {};

GroupController.getAll = () => Group.findAll();
//GroupController.get = (id) => Group.findById(id);
GroupController.get = (id) => Group.findById(id, {include:{model:Student,as:'Students',through: {
            attributes: []
        },}});
GroupController.create = (group) => Group.create(group);
GroupController.delete = (id) => Group.destroy({where:{id:id}});
GroupController.addStudent = (id, student_id) => {
    Group.findById(id)
    .then(g => g.addStudent(student_id));
};
GroupController.getStudents = (id) => Group.findById(id, {include:{model:Student,as:'Students',through: {
            attributes: []
        },}});
module.exports = GroupController;
