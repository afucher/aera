'use strict';
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const Client = require('../../src/models').Client;

lab.experiment('Client Model', () => {
    lab.beforeEach(async () => {
        await Client.destroy({truncate:true, cascade: true});
    })

    lab.test('Should create client with birth hour or date empty', async () => {
        try {
            await Client.create({
                name: 'cliente1',
                birth_hour: '',
                birth_date: ''
            });
            
            let clients = await Client.findAll();
            Code.expect(clients).to.be.an.array().and.have.length(1);
            Code.expect(clients[0].name).to.be.equal('cliente1');
            Code.expect(clients[0].birth_hour).to.be.null();
            Code.expect(clients[0].birth_date).to.be.null();
        } catch (error) {
            throw error;
        }
    });

    lab.test('Should update client with birth hour and date empty', async () => {
        try {
            let client = await Client.create({
                                                name: 'cliente2',
                                                birth_hour: '10:00:00',
                                                birth_date: '04/05/2020'
                                            });
            console.log("client", client.id, client.birth_hour)
            Code.expect(client.birth_hour).to.be.equal('10:00:00');
            Code.expect(client.birth_date).to.be.equal('05/04/2020');

            await Client.update({
                name: 'cliente_atualizado',
                birth_hour: '',
                birth_date: ''
            },{where: {id: client.id}});

            let clients = await Client.findAll();
            Code.expect(clients[0].name).to.be.equal('cliente_atualizado');
            Code.expect(clients[0].birth_hour).to.be.null();
            Code.expect(clients[0].birth_date).to.be.null();
        } catch (error) {
            throw error;
        }
    });
});