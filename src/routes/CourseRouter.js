'use strict';
const CourseController = require('../controllers/CourseController');

module.exports = [
    {
        method: 'GET',
        path: '/courses',
        handler: (request, reply) => {
            CourseController.getAll()
                .then(reply);
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
    }
];
