'use strict';
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const Assert = require('assert');
const PaymentController = require('../../src/controllers/PaymentController');
const {Payment, Course, Group, Client, ClientGroup} = require('../../src/models');

const mountGroup = course_id => {
    return {
        course_id,
        classes: 4,
        start_date: "01/01/2017",
        end_date: "01/02/2017",
        start_hour: "20:00",
        end_hour: "22:00"
    }
}


lab.experiment('PaymentController', () => {
    lab.afterEach(done => {
        Payment.destroy({truncate:true, cascade: true}).then(done);
    });

    lab.test('Should return a single payment', async () => {
        try {
            let payment = await Payment.create({
                clientGroup_id: 1,
                installment: 1,
                value: 10.50,
                due_date: new Date(2018,5-1,2)
            });
                let result = await PaymentController.get(payment.clientGroup_id, payment.installment);
                Code.expect(result.paid).to.be.an.boolean().and.be.false();
                Code.expect(result.clientGroup_id).to.be.equals(payment.clientGroup_id);
                Code.expect(result.installment).to.be.equals(payment.installment);
                Code.expect(result.value).to.be.equals(payment.value);
                Code.expect(result.due_date).to.be.equals(payment.due_date);
            
        } catch (error) {
            throw error;
        }
    });

    lab.test('Should pay a payment', async () => {
        try {
            let payment = await Payment.create({
                clientGroup_id: 1,
                installment: 1,
                value: 10.50,
                due_date: new Date(2018,5-1,2)
            });

            await PaymentController.pay(payment.clientGroup_id, payment.installment);
            
            payment = await Payment.findOne({where:{
                clientGroup_id : payment.clientGroup_id,
                installment: payment.installment
            }});

            Code.expect(payment.paid).to.be.an.boolean().and.be.true();
        } catch (error) {
            throw error;
        }
    });

    lab.test('Should return total of paid and unpaid payments for months', async () => {
        try {
            const JANUARY = 1;
            const MARCH = 3;

            await Payment.create({
                clientGroup_id: 1,
                installment: 1,
                value: 10.50,
                due_date: new Date(2019,JANUARY-1,2)
            });
            await Payment.create({
                clientGroup_id: 2,
                installment: 1,
                value: 1.35,
                paid: true,
                due_date: new Date(2019,MARCH-1,2)
            });
            await Payment.create({
                clientGroup_id: 3,
                installment: 1,
                value: 2.74,
                paid: true,
                due_date: new Date(2019,MARCH-1,2)
            });
            let result = await PaymentController.getTotalPaymentsForMonths(JANUARY, 3);
            Code.expect(result).to.have.length(3);
            Code.expect(result[0].unpaid).to.be.equals(10.50);
            Code.expect(result[0].paid).to.be.equals(0);
            Code.expect(result[1].unpaid).to.be.equals(0);
            Code.expect(result[1].paid).to.be.equals(0);
            Code.expect(result[2].unpaid).to.be.equals(0);
            Code.expect(result[2].paid).to.be.equals(4.09);
            
        } catch (error) {
            throw error;
        }
    });

});


