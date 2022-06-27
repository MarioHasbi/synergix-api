const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()
    }),
    create: Joi.object().keys({
        user_id: Joi.number().min(1).required(),
        work_schedule_detail_id: Joi.number().allow(null).allow("").optional(),
        break_reason_id: Joi.number().min(1).required(),
        break_start: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("break_start must be a valid datetime format").min(1).required(),
        break_end: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("break_end must be a valid datetime format").allow(null).allow("").optional(),
        total_break: Joi.string().allow(null).allow("").optional(),
        total_break_int: Joi.number().allow(null).allow("").optional(),
        is_active: Joi.number().allow(null).allow("").optional()
    }),
    update: Joi.object().keys({
        user_id: Joi.number().allow(null).allow("").optional(),
        work_schedule_detail_id: Joi.number().allow(null).allow("").optional(),
        break_reason_id: Joi.number().allow(null).allow("").optional(),
        break_start: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("break_start must be a valid datetime format").allow(null).allow("").optional(),
        break_end: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("break_end must be a valid datetime format").allow(null).allow("").optional(),
        total_break: Joi.string().allow(null).allow("").optional(),
        total_break_int: Joi.number().allow(null).allow("").optional(),
        is_active: Joi.number().allow(null).allow("").optional()
    }),
}

module.exports = schemas
