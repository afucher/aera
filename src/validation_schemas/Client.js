const Joi = require('joi');

const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email(),
    cpf: Joi.string().regex(/^[0-9]+$/).max(11),
    phone: Joi.string().regex(/^[0-9]+$/)
});

module.exports = schema;