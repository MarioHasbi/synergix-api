const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({ 
        id: Joi.number().min(1).required()
    }),
    create: Joi.object().keys({
        info: Joi.string(),
        user_id: Joi.number().min(1).required(),
        is_active: Joi.number().valid(0,1)
    }),
    update: Joi.object().keys({
        info: Joi.string(),
        user_id: Joi.number().min(1),
        is_active: Joi.number().valid(0,1)
    }),
} 

module.exports = schemas
