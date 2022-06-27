const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({ 
        id: Joi.number().min(1).required()
    }),
    create: Joi.array().items(Joi.object().keys({
        user_level_id: Joi.number().min(1).required(),
        module_id: Joi.number().min(1).required(),
        module_activity_id: Joi.string(),
        is_active: Joi.number().valid(0,1)
    })),
}

module.exports = schemas
