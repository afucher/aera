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
    lab.test('Should make a payment paied', async () => {
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


