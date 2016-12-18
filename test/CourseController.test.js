'use strict';
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const Assert = require('assert');
const CourseController = require('../src/controllers/CourseController');
const Course = require('../src/models').Course;

lab.experiment('CourseController', () => {
    lab.test('Should not return courses', (done) => {

        CourseController.get()
            .then((courses)=>{
                Code.expect(courses).to.be.empty();
                done();
            });
        
    });

    lab.test('Should return 1 course', (done) => {
        Course.create( {description:'teste' }).then(() => {
            CourseController.get()
            .then((courses)=>{
                Code.expect(courses).to.have.length(1);
                done();
            });
        });
    });
});
