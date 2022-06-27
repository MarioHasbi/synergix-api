const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()

    }),
    create: Joi.object().keys({
        // insert here
        campaign_id: Joi.number().min(1).required(),
        subject: Joi.string().min(1).required(),
        content: Joi.string().min(1).required(),
        is_active: Joi.number().min(1).required()
    }),
    update: Joi.object().keys({
        // insert here
        campaign_id: Joi.number().allow(null).allow("").optional(),
        subject: Joi.string().allow(null).allow("").optional(),
        content: Joi.string().allow(null).allow("").optional(),
        is_active: Joi.number().allow(null).allow("").optional()
    }),
}

module.exports = schemas
