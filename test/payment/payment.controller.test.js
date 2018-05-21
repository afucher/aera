'use strict';
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const Assert = require('assert');
const PaymentController = require('../../src/controllers/PaymentController');
const Payment = require('../../src/models').Payment;

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

});


