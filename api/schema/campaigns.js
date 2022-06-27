const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()

    }),
    create: Joi.object().keys({
        sort: Joi.number().allow(null).allow("").optional(),
        code: Joi.string().allow(null).allow("").optional(),
        media_id: Joi.number().allow(null).allow("").optional(),
        name: Joi.string().allow(null).allow("").optional(),
        start_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("start_date must be a valid datetime format").allow(null).allow("").optional(),
        end_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("end_date must be a valid datetime format").allow(null).allow("").optional(),
        last_generate_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("last_generate_date must be a valid datetime format").allow(null).allow("").optional(),
        info: Joi.string().allow(null).allow("").optional(),
        is_default: Joi.number().allow(null).allow("").optional(),
        is_active: Joi.number().allow(null).allow("").optional()
    }),
    update: Joi.object().keys({
        sort: Joi.number().allow(null).allow("").optional(),
        code: Joi.string().allow(null).allow("").optional(),
        media_id: Joi.number().allow(null).allow("").optional(),
        name: Joi.string().allow(null).allow("").optional(),
        start_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("start_date must be a valid datetime format").allow(null).allow("").optional(),
        end_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("end_date must be a valid datetime format").allow(null).allow("").optional(),
        last_generate_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("last_generate_date must be a valid datetime format").allow(null).allow("").optional(),
        info: Joi.string().allow(null).allow("").optional(),
        is_default: Joi.number().allow(null).allow("").optional(),
        is_active: Joi.number().allow(null).allow("").optional()
    }),
}

module.exports = schemas
