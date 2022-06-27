const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()

    }),
    create: Joi.object().keys({
        sort: Joi.string().allow(null).allow("").optional(),
        field_name: Joi.string().min(1).required(),
        field_display_name: Joi.string().min(1).required(),
        data_type_id: Joi.number().min(1).required(),
        is_active: Joi.number().min(1).required()
    }),
    update: Joi.object().keys({
        sort: Joi.string().allow(null).allow("").optional(),
        field_name: Joi.string().allow(null).allow("").optional(),
        field_display_name: Joi.string().allow(null).allow("").optional(),
        data_type_id: Joi.number().allow(null).allow("").optional(),
        is_active: Joi.number().allow(null).allow("").optional()
    }),
}

module.exports = schemas
