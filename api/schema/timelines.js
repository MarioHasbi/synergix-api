const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()
    }),
    create: Joi.object().keys({
        media_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("media_date must be a valid datetime format").allow(null).allow("").optional(),
        media_id: Joi.number().allow(null).allow("").optional(),
        direction_id: Joi.number().allow(null).allow("").optional(),
        media_record_id: Joi.number().allow(null).allow("").optional(),
        media_status_id: Joi.number().allow(null).allow("").optional(),
        media_status_detail_id: Joi.number().allow(null).allow("").optional(),
        media_status_detail_sub_id: Joi.number().allow(null).allow("").optional(),
        user_id: Joi.number().allow(null).allow("").optional(),
        customer_id: Joi.number().allow(null).allow("").optional(),
        customer_account_id: Joi.number().allow(null).allow("").optional(),
        contact_name: Joi.string().allow(null).allow("").optional(),
        contact_type_id: Joi.number().allow(null).allow("").optional(),
        address: Joi.string().allow(null).allow("").optional(),
        verify_result: Joi.number().allow(null).allow("").optional(),
        content: Joi.string().allow(null).allow("").optional(),
    }),

    update: Joi.object().keys({
        media_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("media_date must be a valid datetime format").allow(null).allow("").optional(),
        media_id: Joi.number().allow(null).allow("").optional(),
        direction_id: Joi.number().allow(null).allow("").optional(),
        media_record_id: Joi.number().allow(null).allow("").optional(),
        media_status_id: Joi.number().allow(null).allow("").optional(),
        media_status_detail_id: Joi.number().allow(null).allow("").optional(),
        media_status_detail_sub_id: Joi.number().allow(null).allow("").optional(),
        user_id: Joi.number().allow(null).allow("").optional(),
        customer_id: Joi.number().allow(null).allow("").optional(),
        customer_account_id: Joi.number().allow(null).allow("").optional(),
        contact_name: Joi.string().allow(null).allow("").optional(),
        contact_type_id: Joi.number().allow(null).allow("").optional(),
        address: Joi.string().allow(null).allow("").optional(),
        verify_result: Joi.number().allow(null).allow("").optional(),
        content: Joi.string().allow(null).allow("").optional(),
    })
}

module.exports = schemas
