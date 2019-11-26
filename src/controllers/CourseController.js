'use strict';
const Course = require('../models').Course;
const Group = require('../models').Group;
const CourseController = {};

const updOptWithGroup  = (id) => {
    return {
        where: {
            id
        },
        fields:['name','description']
    }
}

const updOptWithoutGroup  = (id) => {
    let opt = updOptWithGroup(id);
    opt.fields.push('courseLoad');
    return opt;
}

CourseController.getAll = ({filter,limit,offset, onlyPending}) => {

        //filter? 
        //Payment.findAndCountAll({where:{name:{$ilike:'%'+filter+'%'}},limit,offset,order:'due_date',include:clientInfo}).then(normalizeAllPayments) : 
            let opt = filter ? {} : {
                limit,
                offset
            };
            return Course.findAndCountAll(opt);

};
CourseController.get = (id) => Course.findByPk(id);
CourseController.create = (course) => Course.create(course);
CourseController.delete = (id) => Course.destroy({where:{id:id}});
CourseController.update = course => {
    return Group.findOne({where:{course_id:course.id}})
        .then(group => {
            let opt = group ? updOptWithGroup(course.id) : updOptWithoutGroup(course.id);
            return Course.update(course, opt);
        });
}
CourseController.hasGroup = id => Group.findOne({where:{course_id:id}}).then(group => Promise.resolve(group?true:false));

module.exports = CourseController;
