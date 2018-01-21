'use strict';
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const expect = require('code').expect;
const Payment = require('../../src/models').Payment;
const ClientGroup = require('../../src/models').ClientGroup;

lab.experiment('Payment Model', () => {
    lab.test('Should return all payments from GroupClient', async () => {
        try {
            let clientGroup = await ClientGroup.create({client_id: 1,group_id: 1});
            await Payment.create({
                clientGroup_id: clientGroup.id,
                installment: 1,
                value: 10.50,
                due_date: new Date()
            });
            await Payment.create({
                clientGroup_id: clientGroup.id,
                installment: 2,
                value: 10.50,
                due_date: new Date()
            });
            
            let payments = await Payment.findAll({where: {
                                                        clientGroup_id : clientGroup.id
                                                    }
            })
            Code.expect(payments).to.be.an.array().and.have.length(2);
        } catch (error) {
            throw error;
        }
    });
});