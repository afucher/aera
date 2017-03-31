'use strict';
exports.register = function (server, options, next) {

    server.route(require('../routes/CourseRouter'));
    server.route(require('../routes/GroupRouter'));
    server.route(require('../routes/ClientRouter'));
    server.route(require('../routes/TeacherRouter'));
    server.route(require('../routes/AutoCompleteRouter'));

    next();

};

exports.register.attributes = {
    name: 'aera',
    version: '0.0.0'
};