const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()
    }),
    create: Joi.object().keys({
        user_id: Joi.number().allow(null).allow("").optional(),
        username: Joi.string().allow(null).allow("").optional(),
        fullname: Joi.string().allow(null).allow("").optional(),
        ext_in: Joi.string().allow(null).allow("").optional(),
        ext_out: Joi.string().allow(null).allow("").optional(),
        user_activity: Joi.string().allow(null).allow("").optional(),
        user_level: Joi.string().allow(null).allow("").optional(),
        duration: Joi.string().allow(null).allow("").optional(),
        activity_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("activity_date must be a valid datetime format").allow(null).allow("").optional(),
        break_time: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("break_time must be a valid datetime format").allow(null).allow("").optional(),
        first_login: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("first_login must be a valid datetime format").allow(null).allow("").optional(),
        last_logout: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("last_logout must be a valid datetime format").allow(null).allow("").optional(),
        total_login: Joi.number().allow(null).allow("").optional(),
        login_duration: Joi.string().allow(null).allow("").optional(),
        logout_reason: Joi.string().allow(null).allow("").optional(),
    }),

    update: Joi.object().keys({
        user_id: Joi.number().allow(null).allow("").optional(),
        username: Joi.string().allow(null).allow("").optional(),
        fullname: Joi.string().allow(null).allow("").optional(),
        ext_in: Joi.string().allow(null).allow("").optional(),
        ext_out: Joi.string().allow(null).allow("").optional(),
        user_activity: Joi.string().allow(null).allow("").optional(),
        user_level: Joi.string().allow(null).allow("").optional(),
        duration: Joi.string().allow(null).allow("").optional(),
        activity_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("activity_date must be a valid datetime format").allow(null).allow("").optional(),
        break_time: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("break_time must be a valid datetime format").allow(null).allow("").optional(),
        first_login: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("first_login must be a valid datetime format").allow(null).allow("").optional(),
        last_logout: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("last_logout must be a valid datetime format").allow(null).allow("").optional(),
        total_login: Joi.number().allow(null).allow("").optional(),
        login_duration: Joi.string().allow(null).allow("").optional(),
        logout_reason: Joi.string().allow(null).allow("").optional(),
    })
}

module.exports = schemas
