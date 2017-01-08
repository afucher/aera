'use strict';
const Group= require('../models').Group;

const GroupController = {};

GroupController.getAll = () => Group.findAll();
GroupController.get = (id) => Group.findById(id);
GroupController.create = (group) => Group.create(group);
GroupController.delete = (id) => Group.destroy({where:{id:id}});

module.exports = GroupController;
