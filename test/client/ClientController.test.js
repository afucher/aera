'use strict';
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const Assert = require('assert');
const ClientController = require('../../src/controllers/ClientController');
const Client = require('../../src/models').Client;
const Course = require('../../src/models').Course;
const Group = require('../../src/models').Group;

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


lab.experiment('ClientController', () => {
    lab.test('Should return all groups from client', async () => {
        try {
            let client = await Client.create({name:"Client1"});
            let course = await Course.create({name:"Course1", description:"Description",courseLoad:20});
            let group = await Group.create(mountGroup(course.id));
                        await group.addStudent(client);
            group = await Group.create(mountGroup(course.id));
                    await group.addStudent(client);
            
            let clientGroups = await ClientController.getAllGroups(client.id);
            Code.expect(clientGroups.Groups).to.be.an.array().and.have.length(2);
        } catch (error) {
            throw error;
        }
    });
});


