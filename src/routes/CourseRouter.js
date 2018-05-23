'use strict';
const CourseController = require('../controllers/CourseController');

module.exports = [
    {
        method: 'GET',
        path: '/courses',
        handler: ({query}, reply) => {
            let opt = query.query ? {
                filter: query.query,
                limit : query.limit,
                offset: query.limit * (query.page-1) || 0
            } : {};
            CourseController.getAll(opt)
                .then(courses => reply({data:courses.rows,count:courses.count}));
                //.then(reply);
        }
    },
    {
        method: 'GET',
        path: '/courses/{id}',
        handler: (request, reply) => {
            CourseController.get(request.params.id)
                .then((course) => reply(course));
        }
    },
    {
        method: 'GET',
        path: '/courses/{id}/hasGroup',
        handler: (request, reply) => {
            CourseController.hasGroup(request.params.id)
                .then(reply);
        }
    },
    {
        method: 'POST',
        path: '/courses',
        handler: (request, reply) => {
            CourseController.create(request.payload)
                .then((course) => reply(course));
        }
    },
    {
        method: 'DELETE',
        path: '/courses/{id}',
        handler: (request, reply) => {
            CourseController.delete(request.params.id)
                .then((course) => reply(course))
                .catch((err) => reply(err));
        }
    },
    {
        method: 'PUT',
        path: '/courses',
        handler: (request, reply) => {
            CourseController.update(request.payload)
                .then(reply)
                .catch(reply);
        }
    }
];
