const Joi = require('joi');

const schema = Joi.object().keys({
    course_id: Joi.number().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
    start_hour: Joi.string().regex(/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/).required(),
    end_hour: Joi.string().regex(/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/).required()
});

module.exports = schema;

/*
Joi.validate({ 
    course_id: 12312412,
    start_date: new Date(),
    end_date: new Date(),
    start_hour: '24:00:00',
    end_hour: '25:00:00',
 }, schema, {abortEarly:false},function (err, value) { 
     err ? console.log(err) :  console.log(value);
  });*/