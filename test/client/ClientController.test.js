'use strict';
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const Assert = require('assert');
const ClientController = require('../../src/controllers/ClientController');
const Client = require('../../src/models').Client;
const Course = require('../../src/models').Course;
const Group = require('../../src/models').Group;
const ClientGroup = require('../../src/models').ClientGroup;
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

    lab.test('Should return all groups from client', async () => {
        try {
            let client = await Client.create({name:"Client1"});
            let course1 = await Course.create({name:"Course1", description:"Description",courseLoad:20});
            let course2 = await Course.create({name:"Course2", description:"Description",courseLoad:20});
            let group1 = await Group.create(mountGroup(course1.id));
            let group2 = await Group.create(mountGroup(course2.id));

            await ClientGroup.create({client_id: 99,group_id:99});
            await ClientGroup.create({client_id: 98,group_id:98});

            let clientGroup1 = await ClientGroup.create({client_id: client.id,group_id: group1.id});
            let clientGroup2 = await ClientGroup.create({client_id: client.id,group_id: group2.id});

            await Payment.create({
                clientGroup_id: clientGroup1.id,
                installment: 1,
                value: 10.50,
                due_date: new Date()
            });

            await Payment.create({
                clientGroup_id: clientGroup1.id,
                installment: 2,
                value: 10.50,
                due_date: new Date()
            });

            await Payment.create({
                clientGroup_id: clientGroup2.id,
                installment: 1,
                value: 10.50,
                due_date: new Date(),
            });

            let clientWithPayments = await ClientController.getWithPayments(client.id)

            Code.expect(clientWithPayments.ClientGroups).to.be.an.array().and.have.length(2);
            Code.expect(clientWithPayments.ClientGroups[0].Payments).to.be.an.array().and.have.length(2);
            Code.expect(clientWithPayments.ClientGroups[0].Group.Course.name).to.be.equals("Course1");
            Code.expect(clientWithPayments.ClientGroups[1].Payments).to.be.an.array().and.have.length(1);
            Code.expect(clientWithPayments.ClientGroups[1].Group.Course.name).to.be.equals("Course2");            

        


        } catch (error) {
            throw error;
        }
    });

    lab.test('Should return payments from client for specific month', async () => {
        try {
            let client = await Client.create({name:"Client1"});
            let course1 = await Course.create({name:"Course1", description:"Description",courseLoad:20});
            let course2 = await Course.create({name:"Course2", description:"Description",courseLoad:20});
            let group1 = await Group.create(mountGroup(course1.id));
            let group2 = await Group.create(mountGroup(course2.id));

            await ClientGroup.create({client_id: 99,group_id:99});
            await ClientGroup.create({client_id: 98,group_id:98});

            let clientGroup1 = await ClientGroup.create({client_id: client.id,group_id: group1.id});
            let clientGroup2 = await ClientGroup.create({client_id: client.id,group_id: group2.id});
            
            let month5 = new Date();
            month5.setMonth(5-1);

            let month6 = new Date();
            month6.setMonth(6-1);

            await Payment.create({
                clientGroup_id: clientGroup1.id,
                installment: 1,
                value: 10.50,
                due_date: month5
            });

            await Payment.create({
                clientGroup_id: clientGroup1.id,
                installment: 2,
                value: 10.50,
                due_date: month6,
            });

            await Payment.create({
                clientGroup_id: clientGroup2.id,
                installment: 1,
                value: 10.50,
                due_date: month6,
            });

            let clientWithPayments = await ClientController.getWithPayments(client.id,5)
            Code.expect(clientWithPayments.ClientGroups).to.be.an.array().and.have.length(1);
            Code.expect(clientWithPayments.ClientGroups[0].Payments).to.be.an.array().and.have.length(1);
            Code.expect(clientWithPayments.ClientGroups[0].Group.Course.name).to.be.equals("Course1");
            
        


        } catch (error) {
            throw error;
        }
    });
    lab.test('Should not return paid payments', async () => {
        try {
            let client = await Client.create({name:"Client1"});
            let course1 = await Course.create({name:"Course1", description:"Description",courseLoad:20});
            let group1 = await Group.create(mountGroup(course1.id));
            let clientGroup1 = await ClientGroup.create({client_id: client.id,group_id: group1.id});

            await Payment.create({
                clientGroup_id: clientGroup1.id,
                installment: 1,
                value: 10.50,
                due_date: new Date(2018,5-1,2),
                paid: true
            });

            let clientWithPayments = await ClientController.getWithPayments(client.id,5)
            Code.expect(clientWithPayments).to.be.null();

        } catch (error) {
            throw error;
        }
    });

    lab.test('Should return client with all finished groups and number of classes', async () => {
        let client = await Client.create({name:"Client1"});
        let course1 = await Course.create({name:"Course1", description:"Description",courseLoad:20});
        let course2 = await Course.create({name:"Course2", description:"Description",courseLoad:20});
        
        const finishedGroup = mountGroup(course1.id);
        let group1 = await Group.create(finishedGroup);
        
        let currentGroup = mountGroup(course2.id);
        const tomorrow = new Date(new Date() + 1);
        currentGroup.end_date = `${tomorrow.getDay()}/${tomorrow.getMonth()+1}/${tomorrow.getFullYear()}`;
        let group2 = await Group.create(currentGroup);

        await ClientGroup.create({client_id: 99,group_id:99});
        await ClientGroup.create({client_id: 98,group_id:98});

        await ClientGroup.create({client_id: client.id,group_id: group1.id, attendance: 4});
        await ClientGroup.create({client_id: client.id,group_id: group2.id, attendance: 3});

        let clientWithGroups = await ClientController.getFinishedGroupsWithAttendance(client.id)

        Code.expect(clientWithGroups.ClientGroups).to.be.an.array().and.have.length(1);
        Code.expect(clientWithGroups.ClientGroups[0].Group.Course.name).to.be.equals("Course1");
        Code.expect(clientWithGroups.ClientGroups[0].attendance).to.be.equals(4);
    });

});


