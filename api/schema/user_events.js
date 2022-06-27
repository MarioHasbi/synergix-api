const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()
    }),
    create: Joi.object().keys({ 
event_date:Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("event_date must be a valid datetime format").allow(null).allow("").optional(),
work_schedule_detail_id:Joi.number().allow(null).allow("").optional(),
user_id:Joi.number().allow(null).allow("").optional(),
user_activity_id:Joi.number().allow(null).allow("").optional(),
user_level_id:Joi.number().allow(null).allow("").optional(),
is_login:Joi.number().allow(null).allow("").optional(),
is_logout:Joi.number().allow(null).allow("").optional(),
duration:Joi.string().allow(null).allow("").optional(),
duration_int:Joi.number().allow(null).allow("").optional(),
host:Joi.string().allow(null).allow("").optional(),
ip_address:Joi.string().allow(null).allow("").optional(),
extension:Joi.string().allow(null).allow("").optional(),
    }),

    update: Joi.object().keys({
        event_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("event_date must be a valid datetime format").allow(null).allow("").optional(),
        work_schedule_detail_id: Joi.number().allow(null).allow("").optional(),
        user_id: Joi.number().allow(null).allow("").optional(),
        user_activity_id: Joi.number().allow(null).allow("").optional(),
        user_level_id: Joi.number().allow(null).allow("").optional(),
        is_login: Joi.number().allow(null).allow("").optional(),
        is_logout: Joi.number().allow(null).allow("").optional(),
        duration: Joi.string().allow(null).allow("").optional(),
        duration_int: Joi.number().allow(null).allow("").optional(),
        host: Joi.string().allow(null).allow("").optional(),
        ip_address: Joi.string().allow(null).allow("").optional(),
        extension: Joi.string().allow(null).allow("").optional(),
    })
}

module.exports = schemas
