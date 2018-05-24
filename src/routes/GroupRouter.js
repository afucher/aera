'use strict';
const Boom = require('boom');
const GroupController = require('../controllers/GroupController');
const ClientGroupController = require('../controllers/ClientGroupController');
const GroupValidation = require('../validation_schemas/Group');
const PDFDocument = require('pdfkit');
module.exports = [
    {
        method: 'GET',
        path: '/groups',
        handler: ({query}, reply) => {
            let opt = query.query ? {
                filter: query.query,
                limit : query.limit,
                offset: query.limit * (query.page-1) || 0
            } : {};
            GroupController.getAll(opt)
                .then(groups => reply({data:groups.rows,count:groups.count}));
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
        method: 'PUT',
        path: '/groups/{id}',
        handler: ({payload}, reply) => {
            GroupController.update(payload)
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
            console.log("router",student_id);
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
            ClientGroupController.updateStudentAttendance(group_id, student_id, attendance)
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
    },
    {
        method:'GET',
        path: '/groups/{id}/list',
        handler: ({params}, reply) => {
            GroupController.getGroupList(params.id)
                .then(({data,name}) => {
                    reply(data).bytes(data.length).type('application/pdf')
                        .header("Content-Disposition", "attachment; filename=" + name);
                })
            /*let doc = new PDFDocument();
            let buffers = [];
            doc.text(`Lista do Curso: ${request.params.id}`, 10, 10);
            doc.on('data', buffers.push.bind(buffers) )
            doc.on('end', ()=>{
                const data = Buffer.concat(buffers);
                reply(data).bytes(data.length).type('application/pdf')
                .header("Content-Disposition", "attachment; filename=" + "meu.pdf");
            })
            doc.end();*/
        }
    },
    {
        method: 'POST',
        path: '/groups/{id}/createInstallments',
        handler: (request, reply) => {
            const group_id = request.params.id;
            return GroupController.createPayments(group_id,request.payload)
                .then(reply)
                .catch(reply);
        }
    }
];
