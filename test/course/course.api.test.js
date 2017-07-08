'use strict';
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const expect = require('code').expect;
const Course = require('../../src/models').Course;
const Server = require('../../index.js');
const AuthenticatedUser = require('../utils/AuthenticatedUser');
let cookie;
const getBaseOptions = () => {
    return {
            method : 'GET',
            url : '/api/courses',
            headers: {cookie}
        }
};
lab.experiment('CourseAPI', () => {

    lab.before((done) => {
        AuthenticatedUser(Server, response => {
            cookie = response.headers['set-cookie'][0].match(/(?:[^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)\s*=\s*(?:([^\x00-\x20\"\,\;\\\x7F]*))/)[0];
            Course.destroy({truncate:true, cascade: true}).then(done);
        });
    });
    lab.afterEach(done => {
        Course.destroy({truncate:true, cascade: true}).then(done);
    })

    lab.test('should return empty array | GET /api/courses', done => {
        let options = getBaseOptions();
        Server.inject(options, response => {
            let result = response.result;
            expect(response.statusCode).to.equal(200);
            expect(result).to.be.an.array();
            expect(result).to.be.empty();
            done();
        })
    });

    lab.test('should return array with 2 courses | GET /api/courses', done => {
        let options = getBaseOptions();
        Course.bulkCreate([{
            name : "course1",
            description: "description",
            courseLoad: 20
        },{
            name : "course2",
            description: "description",
            courseLoad: 20
        }])
        .then(() => {
            Server.inject(options, response => {
                let result = response.result;
                expect(response.statusCode).to.equal(200);
                expect(result).to.be.an.array();
                expect(result.length).to.be.equal(2);
                done();
            })
        })
    })

    lab.test('should create a course | POST /api/courses', done => {
        let options = getBaseOptions();
        let course = {
            name : "course1",
            description: "description",
            courseLoad: 20
        };
        options['method'] = 'POST';
        options['payload'] = course;
        Server.inject(options, response => {
            expect(response.result).to.be.an.object();
            expect(response.result.id).to.exist();
            expect(response.result.name).to.exist().and.to.be.equal('course1');
            expect(response.result.description).to.exist().and.to.be.equal('description');
            expect(response.result.courseLoad).to.exist().and.to.be.equal(20);  
            done();
        })
    });
});