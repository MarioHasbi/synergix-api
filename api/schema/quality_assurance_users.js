const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()

    }),
    create: Joi.object().keys({
        quality_assurance_id: Joi.number().allow(null).allow("").optional(),
        user_id: Joi.number().allow(null).allow("").optional(),
        call_id: Joi.number().allow(null).allow("").optional(),
        period_id: Joi.number().allow(null).allow("").optional(),
        notes: Joi.string().allow(null).allow("").optional(),
        quality_assurance_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/).message("quality_assurance_date must be a valid datetime format").allow(null).allow("").optional(),
        observer_id: Joi.number().allow(null).allow("").optional()

    }),
    update: Joi.object().keys({
        quality_assurance_id: Joi.number().allow(null).allow("").optional(),
        user_id: Joi.number().allow(null).allow("").optional(),
        call_id: Joi.number().allow(null).allow("").optional(),
        period_id: Joi.number().allow(null).allow("").optional(),
        notes: Joi.string().allow(null).allow("").optional(),
        quality_assurance_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/).message("quality_assurance_date must be a valid datetime format").allow(null).allow("").optional(),
        observer_id: Joi.number().allow(null).allow("").optional()
    }),
}

module.exports = schemas
