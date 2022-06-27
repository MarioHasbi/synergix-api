const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({ 
        id: Joi.number().min(1).required(),
    }),
    update: Joi.object().keys({
        is_active: Joi.number().valid(0,1)
    })
} 

module.exports = schemas