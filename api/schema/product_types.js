const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()

    }),
    create: Joi.object().keys({
        sort: Joi.number().allow(null).allow("").optional(),
        code: Joi.string().allow(null).allow("").optional(),
        product_id: Joi.number().allow(null).allow("").optional(),
        name: Joi.string().allow(null).allow("").optional(),
        info: Joi.string().allow(null).allow("").optional(),
        is_default: Joi.number().valid(0, 1).allow(null).allow("").optional(),
        is_active: Joi.number().valid(0, 1).allow(null).allow("").optional()

    }),
    update: Joi.object().keys({
        sort: Joi.number().allow(null).allow("").optional(),
        code: Joi.string().allow(null).allow("").optional(),
        product_id: Joi.number().allow(null).allow("").optional(),
        name: Joi.string().allow(null).allow("").optional(),
        info: Joi.string().allow(null).allow("").optional(),
        is_default: Joi.number().valid(0, 1).allow(null).allow("").optional(),
        is_active: Joi.number().valid(0, 1).allow(null).allow("").optional()
    }),
}

module.exports = schemas
