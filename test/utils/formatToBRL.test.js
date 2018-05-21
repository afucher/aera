'use strict';
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const Assert = require('assert');
const {formatToBRL} = require('../../src/utils');

lab.experiment('formatToBRL', () => {
    lab.test('Should return with simpe float number', (done) => {
        const stringBRL = formatToBRL(2.0);
        Code.expect(stringBRL).to.be.equals('R$ 2,00');
        done();
    });

    lab.test('Should return with 2.000', (done) => {
        const stringBRL = formatToBRL(2000.0);
        Code.expect(stringBRL).to.be.equals('R$ 2.000,00');
        done();
    });

    lab.test('Should return with decimal values', (done) => {
        const stringBRL = formatToBRL(1239.37);
        Code.expect(stringBRL).to.be.equals('R$ 1.239,37');
        done();
    });

    lab.test('Should return with string value', (done) => {
        const stringBRL = formatToBRL('1239.37');
        Code.expect(stringBRL).to.be.equals('R$ 1.239,37');
        done();
    });

});