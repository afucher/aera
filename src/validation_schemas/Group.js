const Joi = require('joi');

const schema = Joi.object().keys({
    course_id: Joi.number().required(),
    teacher_id: Joi.number().required(),
    classes: Joi.number(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
    start_hour: Joi.string().regex(/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/).required(),
    end_hour: Joi.string().regex(/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/).required()
});

module.exports = schema;