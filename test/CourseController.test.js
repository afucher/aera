'use strict';
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const Assert = require('assert');
const CourseController = require('../src/controllers/CourseController');
const Course = require('../src/models').Course;
const defaultOptionsToGetAll = {filter:null,limit:1000,offset:0, onlyPending:false};
lab.experiment('CourseController', () => {
    lab.test('Should not return courses', (done) => {

        CourseController.getAll(defaultOptionsToGetAll)
            .then((courses) => {
                Code.expect(courses.rows).to.be.empty();
                done();
            });

    });

    lab.test('Should return 1 course', (done) => {
        Course.create({ name: 'teste' }).then(() => {
            CourseController.getAll(defaultOptionsToGetAll)
                .then((courses) => {
                    Code.expect(courses.rows).to.have.length(1);
                    done();
                });
        });
    });
    lab.test('Should return specfic Course from :id', (done) => {
        Course.create({ name: 'course2' }).then((c) => {
            CourseController.get(c.id)
                .then((course) => {
                    Code.expect(course.name).to.be.equal('course2');
                    done();
                });
        });
    });
    lab.test('Should create a Course', (done) => {
        CourseController.create({ name: 'course3' })
            .then((course) => {
                Course.findById(course.id).then((c) => {
                    Code.expect(c.name).to.be.equal('course3');
                    done();
                });
            });
    });
    lab.test('Should delete a Course', (done) => {
        let course_id;
        Course.findOne()
            .then((course) => {
                course_id = course.id;
                return CourseController.delete(course_id);
            })
            .then(Course.findById(course_id))
            .then((deleted_courses) => {
                Code.expect(deleted_courses).to.equal(1);
                done();
            });
    });
});
