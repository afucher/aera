'use strict';
const Boom = require('boom');
const GroupController = require('../controllers/GroupController');
const GroupStudentController = require('../controllers/GroupStudentController');
const GroupValidation = require('../validation_schemas/Group');
module.exports = [
    {
        method: 'GET',
        path: '/groups',
        handler: (request, reply) => {
            GroupController.getAll()
                .then(reply);
        }
    },
    {
        method: 'GET',
        path: '/groups/{id}',
        handler: (request, reply) => {
            GroupController.get(request.params.id)
                .then((group) => reply(group));
        }
    },
    {
        method: 'POST',
        path: '/groups',
        handler: ({payload}, reply) => {
            GroupController.create(payload)
                .then((group) => reply(group))
                .catch((err) => {
                    reply(err);
                });
        },
        config: {
            validate: {
                payload : GroupValidation
            }
        }
    },
    {
        method: 'POST',
        path: '/groups/{id}/addStudent',
        handler: (request, reply) => {
            let group_id = request.params.id;
            let student_id = request.payload.student_id;
            GroupController.addStudent(group_id, student_id)
                .then(reply)
                .catch(reply);
        }
    },
    {
        method: 'POST',
        path: '/groups/{id}/studentAttendance',
        handler: (request, reply) => {
            let group_id = request.params.id;
            let student_id = request.payload.student_id;
            let attendance = request.payload.attendance;
            GroupStudentController.updateStudentAttendance(group_id, student_id, attendance)
                .then(reply)
                .catch(reply);
        }
    },
    {
        method: 'GET',
        path: '/groups/{id}/students',
        handler: ({params}, reply) => {
            GroupController.getStudents(params.id)
                .then(g => reply(g))
                .catch(err=>reply(err));
        }
    },
    {
        method: 'DELETE',
        path: '/groups/{id}',
        handler: (request, reply) => {
            GroupController.delete(request.params.id)
                .then((Group) => reply(Group));
        }
    }
];
