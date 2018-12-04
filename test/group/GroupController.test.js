'use strict';
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const GroupController = require('../../src/controllers/GroupController');
const Group = require('../../src/models').Group;
const Course = require('../../src/models').Course;
const Client = require('../../src/models').Client;
const ClientGroup = require('../../src/models').ClientGroup;

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

lab.experiment('GroupController', () => {
    lab.afterEach(async () => {
        await Course.destroy({truncate:true, cascade: true});
        await Group.destroy({truncate:true, cascade: true});
    });
    lab.test('Should unenroll a client', async () => {
            let course = await Course.create({ name: 'teste' });
            let group = await Group.create(mountGroup(course.id));
            let client = await Client.create({name:"Client1"});
            await group.addStudent(client);

            await GroupController.unenroll(group.id, client.id);

            let result = await ClientGroup.findAll({where:{client_id:client.id}});

            Code.expect(result.length).to.be.equals(0);

    });

    lab.test('Should return only current groups when not specified course and allGroups option', async () => {
        let course = await Course.create({ name: 'teste'});

        let currentGroup = mountGroup(course.id);
        currentGroup.end_date = "01/01/2222";
        
        let pastGroup = mountGroup(course.id);
        pastGroup.end_date = "01/01/2000";

        await Group.create(currentGroup);
        await Group.create(pastGroup);
        
        let options = {};
        let result = await GroupController.getAll(options);

        Code.expect(result.rows.length).to.be.equals(1);
    });
    lab.test('Should return only current groups when not specified', async () => {
        let course = await Course.create({ name: 'teste'});

        let currentGroup = mountGroup(course.id);
        currentGroup.end_date = "01/01/2222";
        
        let pastGroup = mountGroup(course.id);
        pastGroup.end_date = "01/01/2000";

        await Group.create(currentGroup);
        await Group.create(pastGroup);
        
        let options = {
            course : course.id
        };
        let result = await GroupController.getAll(options);

        Code.expect(result.rows.length).to.be.equals(1);
    });
    lab.test('Should return only current groups', async () => {
        let course = await Course.create({ name: 'teste'});

        let currentGroup = mountGroup(course.id);
        currentGroup.end_date = "01/01/2222";
        
        let pastGroup = mountGroup(course.id);
        pastGroup.end_date = "01/01/2000";

        await Group.create(currentGroup);
        await Group.create(pastGroup);
        
        let options = {
            course : course.id,
            allGroups : false
        };
        let result = await GroupController.getAll(options);

        Code.expect(result.rows.length).to.be.equals(1);
    });

    lab.test('Should return all groups', async () => {
        let course = await Course.create({ name: 'teste'});

        let currentGroup = mountGroup(course.id);
        currentGroup.end_date = "01/01/2222";
        
        let pastGroup = mountGroup(course.id);
        currentGroup.end_date = "01/01/2000";

        await Group.create(currentGroup);
        await Group.create(pastGroup);
        
        let options = {
            course : course.id,
            allGroups : true
        };
        let result = await GroupController.getAll(options);

        Code.expect(result.rows.length).to.be.equals(2);

    });
});
