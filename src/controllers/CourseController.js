'use strict';
const Course = require('../models').Course;

const CourseController = {};

CourseController.get = () => Course.findAll();

module.exports = CourseController;
