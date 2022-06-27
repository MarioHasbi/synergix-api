const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()

    }),
    create: Joi.object().keys({
        campaign_id: Joi.number().min(1).required(),
        name: Joi.string().min(1).required(),
        info: Joi.string().min(1).required(),
        is_default: Joi.number().allow(null).allow("").optional(),
        is_active: Joi.number().allow(null).allow("").optional()
    }),
    update: Joi.object().keys({
        campaign_id: Joi.number().allow(null).allow("").optional(),
        name: Joi.string().allow(null).allow("").optional(),
        info: Joi.string().allow(null).allow("").optional(),
        is_default: Joi.number().allow(null).allow("").optional(),
        is_active: Joi.number().allow(null).allow("").optional()
    }),
}

module.exports = schemas
