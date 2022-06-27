const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()
    }),
    create: Joi.object().keys({
        call_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("call_date must be a valid datetime format").allow(null).allow("").optional(),
        user_id: Joi.number().allow(null).allow("").optional(),
        username: Joi.string().allow(null).allow("").optional(),
        direction: Joi.string().allow(null).allow("").optional(),
        is_update: Joi.number().allow(null).allow("").optional(),
        is_uptodate: Joi.number().allow(null).allow("").optional(),
        gateway_update: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("gateway_update must be a valid datetime format").allow(null).allow("").optional(),
        date_update: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("date_update must be a valid datetime format").allow(null).allow("").optional(),
        created: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("created must be a valid datetime format").allow(null).allow("").optional(),
    }),
    update: Joi.object().keys({
        call_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("call_date must be a valid datetime format").allow(null).allow("").optional(),
        user_id: Joi.number().allow(null).allow("").optional(),
        username: Joi.string().allow(null).allow("").optional(),
        direction: Joi.string().allow(null).allow("").optional(),
        is_update: Joi.number().allow(null).allow("").optional(),
        is_uptodate: Joi.number().allow(null).allow("").optional(),
        gateway_update: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("gateway_update must be a valid datetime format").allow(null).allow("").optional(),
        date_update: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("date_update must be a valid datetime format").allow(null).allow("").optional(),
        created: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("created must be a valid datetime format").allow(null).allow("").optional(),
    })
}

module.exports = schemas
