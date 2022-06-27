const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()
    }),
    dial: Joi.object().keys({
        source: Joi.number().min(1).required(),
        destination: Joi.number().min(1).required()
    }),
    hangup: Joi.object().keys({ 
        channel: Joi.string().required() 
    }),
}

module.exports = schemas
