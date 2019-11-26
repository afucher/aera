'use strict';
const Teacher = require('../models').Client;

const TeacherController = {};


TeacherController.getAll = ({filter,limit,offset}) => 
    filter? Teacher.findAndCountAll({where:{name:{$ilike:filter+'%'},teacher:true},limit,offset}) : Teacher.findAndCountAll({where:{teacher:true},limit,offset});
TeacherController.get = (id) => Teacher.findByPk(id);
TeacherController.create = (id) => Teacher.update({teacher:true},updateOptions(id));
TeacherController.delete = (id) => Teacher.update({teacher:false},updateOptions(id));

module.exports = TeacherController;

const updateOptions = (id) => {
    return {
        where: {
            id
        },
        fields:['teacher']
    }
}