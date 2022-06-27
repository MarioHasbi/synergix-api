const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()
    }),
    create: Joi.object().keys({
        name: Joi.string().allow(null).allow("").optional(),
        report_field_id: Joi.string().allow(null).allow("").optional(),
        is_active: Joi.number().allow(null).allow("").optional(),
    }),
    update: Joi.object().keys({
        name: Joi.string().allow(null).allow("").optional(),
        report_field_id: Joi.string().allow(null).allow("").optional(),
        is_active: Joi.number().allow(null).allow("").optional(),
    })
}

module.exports = schemas
