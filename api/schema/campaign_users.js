const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()

    }),
    create: Joi.object().keys({
        campaign_id: Joi.number().min(1).required(),
        user_id: Joi.number().min(1).required(),
        is_active: Joi.number().min(1).required()
    }),
    update: Joi.object().keys({
        campaign_id: Joi.number().allow(null).allow("").optional(),
        user_id: Joi.number().allow(null).allow("").optional(),
        is_active: Joi.number().allow(null).allow("").optional()
    }),
}

module.exports = schemas
