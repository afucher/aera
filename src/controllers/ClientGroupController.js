'use strict';
const ClientGroup = require('../models').ClientGroup;

const ClientGroupController = {};

ClientGroupController.updateStudentAttendance = (group_id, client_id, attendance) => {
    let where = {
        group_id,
        client_id
    };
    return ClientGroup.findOne({where}).then(cg => cg.update({attendance : attendance}));
};

module.exports = ClientGroupController;
