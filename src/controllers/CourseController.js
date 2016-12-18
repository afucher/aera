'use strict';
const Course = require('../models').Course;

const CourseController = {};

CourseController.getAll = () => Course.findAll();
CourseController.get = (id) => Course.findById(id);
CourseController.create = (course) => Course.create(course);
CourseController.delete = (id) => Course.destroy({where:{id:id}});

module.exports = CourseController;
