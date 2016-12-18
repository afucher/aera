'use strict';
const Course = require('../models').Course;

let CourseController = {};

CourseController.get = () => Course.findAll();

module.exports = CourseController;