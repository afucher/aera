'use strict';
const Group = require('../models').Group;
const Student = require('../models').Student;

const includeStudents = {
    include: {
        model: Student, as: 'Students', through: {
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
GroupController.addStudent = (id, student_id) => {
    Group.findById(id)
        .then(g => g.addStudent(student_id));
};
GroupController.getStudents = (id) => Group.findById(id, includeStudents);
module.exports = GroupController;
