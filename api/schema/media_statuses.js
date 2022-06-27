const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()

    }),
    create: Joi.object().keys({
        media_id: Joi.number().allow(null).allow("").optional(),
        direction_id: Joi.number().allow(null).allow("").optional(),
        sort: Joi.number().allow(null).allow("").optional(),
        code: Joi.string().allow(null).allow("").optional(),
        name: Joi.string().allow(null).allow("").optional(),
        is_default: Joi.number().valid(0, 1).allow(null).allow("").optional(),
        is_active: Joi.number().valid(0, 1).allow(null).allow("").optional()

    }),
    update: Joi.object().keys({
        media_id: Joi.number().allow(null).allow("").optional(),
        direction_id: Joi.number().allow(null).allow("").optional(),
        sort: Joi.number().allow(null).allow("").optional(),
        code: Joi.string().allow(null).allow("").optional(),
        name: Joi.string().allow(null).allow("").optional(),
        is_default: Joi.number().valid(0, 1).allow(null).allow("").optional(),
        is_active: Joi.number().valid(0, 1).allow(null).allow("").optional()
    }),
}

module.exports = schemas
