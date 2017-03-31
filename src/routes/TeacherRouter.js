'use strict';
const TeacherController = require('../controllers/TeacherController');
const Boom = require('boom');
module.exports = [
    {
        method: 'GET',
        path: '/teachers',
        handler: ({query}, reply) => {
            let opt = {
                filter: query.query,
                limit : query.limit || 10,
                offset: query.limit * (query.page-1) || 0
            }
            TeacherController.getAll(opt)
                .then(courses => reply({data:courses.rows,count:courses.count}));
        }
    },{
        method: 'POST',
        path: '/teachers',
        handler: ({payload}, reply) => {
            TeacherController.create(payload.id).then(reply);
        }
    },{
        method: 'DELETE',
        path: '/teachers',
        handler: ({query}, reply) => {
            TeacherController.delete(query.id).then(reply);
        }
    }
];


const handleError = (err) => {
    let error = null;
    switch(err.errors[0].type){
        case 'unique violation':
            error = Boom.badRequest(err.errors[0].message);
            break;
    }
    return error;
}