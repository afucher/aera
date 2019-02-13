'use strict';
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const Assert = require('assert');
const {getMonthDateRange} = require('../../src/utils');

lab.experiment('getMonthDateRange', () => {
    lab.test('Should return 50 for 2 of 4', (done) => {
        const dateRange = getMonthDateRange(1);
        Code.expect(dateRange.start.date()).to.be.equals(1);
        Code.expect(dateRange.start.month()+1).to.be.equals(1);
        Code.expect(dateRange.start.year()).to.be.equals(2019);
        Code.expect(dateRange.end.date()).to.be.equals(31);
        Code.expect(dateRange.end.month()+1).to.be.equals(1);
        Code.expect(dateRange.end.year()).to.be.equals(2019);
        done();
    });

});