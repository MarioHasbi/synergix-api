const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({ 
        id: Joi.number().min(1).required(),
    })
} 

module.exports = schemas