'use strict';
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const Assert = require('assert');
const {attendanceToPercentage} = require('../../src/utils');

lab.experiment('attendanceToPercentage', () => {
    lab.test('Should return 50 for 2 of 4', (done) => {
        const percentage = attendanceToPercentage(2,4);
        Code.expect(percentage).to.be.equals('50');
        done();
    });

    lab.test('Should return 33 for 1 of 3', (done) => {
        const percentage = attendanceToPercentage(1,3);
        Code.expect(percentage).to.be.equals('33');
        done();
    });
});