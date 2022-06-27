const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()

    }),
    create: Joi.object().keys({
        campaign_id: Joi.number().allow(null).allow("").optional(),
        customer_id: Joi.number().allow(null).allow("").optional(),
        callback_reason_id: Joi.number().allow(null).allow("").optional(),
        phone_no: Joi.string().allow(null).allow("").optional(),
        user_id: Joi.number().allow(null).allow("").optional(),
        callback_time: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("callback_time must be a valid datetime format").allow(null).allow("").optional(),
        is_req_callfile: Joi.number().allow(null).allow("").optional(),
        is_called: Joi.number().allow(null).allow("").optional(),
        call_id: Joi.number().allow(null).allow("").optional(),
        created_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("created_at must be a valid datetime format").allow(null).allow("").optional()
    }),
    update: Joi.object().keys({
        id: Joi.number().allow(null).allow("").optional(),
        campaign_id: Joi.number().allow(null).allow("").optional(),
        customer_id: Joi.number().allow(null).allow("").optional(),
        callback_reason_id: Joi.number().allow(null).allow("").optional(),
        phone_no: Joi.string().allow(null).allow("").optional(),
        user_id: Joi.number().allow(null).allow("").optional(),
        callback_time: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("callback_time must be a valid datetime format").allow(null).allow("").optional(),
        is_req_callfile: Joi.number().allow(null).allow("").optional(),
        is_called: Joi.number().allow(null).allow("").optional(),
        call_id: Joi.number().allow(null).allow("").optional(),
        created_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("created_at must be a valid datetime format").allow(null).allow("").optional()
    }),
}

module.exports = schemas
