const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()
    }),
    create: Joi.object().keys({
        direction_id: Joi.number().allow(null).allow("").optional(),
        mail_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("mail_date must be a valid datetime format").allow(null).allow("").optional(),
        subject: Joi.string().allow(null).allow("").optional(),
        email_from: Joi.string().allow(null).allow("").optional(),
        email_to: Joi.string().allow(null).allow("").optional(),
        email_cc: Joi.string().allow(null).allow("").optional(),
        email_bcc: Joi.string().allow(null).allow("").optional(),
        content: Joi.string().allow(null).allow("").optional(),
        content_html: Joi.string().allow(null).allow("").optional(),
        mail_error_info: Joi.string().allow(null).allow("").optional(),
        outbound_category_id: Joi.number().allow(null).allow("").optional(),
        outbound_category_detail_id: Joi.number().allow(null).allow("").optional(),
        email_status_id: Joi.number().allow(null).allow("").optional(),
        is_complete: Joi.number().allow(null).allow("").optional(),
        uid: Joi.string().allow(null).allow("").optional(),
        campaign_id: Joi.number().allow(null).allow("").optional(),
        customer_id: Joi.number().allow(null).allow("").optional(),
        created_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("created_at must be a valid datetime format").allow(null).allow("").optional(),
        created_by: Joi.number().allow(null).allow("").optional(),
        updated_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("updated_at must be a valid datetime format").allow(null).allow("").optional(),
        updated_by: Joi.number().allow(null).allow("").optional(),
        send_error_attempt: Joi.string().allow(null).allow("").optional()
    }),
    forgotPassword: Joi.object().keys({
        email_status_id: Joi.number().min(1).required(),
        direction_id: Joi.number().valid(1, 2).required(),
        is_complete: Joi.number().valid(0, 1),
        mail_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message('mail_date must be a valid datetime format').required(),
        email_from: Joi.string().email({ minDomainSegments: 2 }).required(),
        email_to: Joi.string().required(),
        subject: Joi.string().required(),
        content: Joi.string().required(),
        content_html: Joi.string().required()
    }),
    update: Joi.object().keys({
        direction_id: Joi.number().allow(null).allow("").optional(),
        mail_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("mail_date must be a valid datetime format").allow(null).allow("").optional(),
        subject: Joi.string().allow(null).allow("").optional(),
        email_from: Joi.string().allow(null).allow("").optional(),
        email_to: Joi.string().allow(null).allow("").optional(),
        email_cc: Joi.string().allow(null).allow("").optional(),
        email_bcc: Joi.string().allow(null).allow("").optional(),
        content: Joi.string().allow(null).allow("").optional(),
        content_html: Joi.string().allow(null).allow("").optional(),
        mail_error_info: Joi.string().allow(null).allow("").optional(),
        outbound_category_id: Joi.number().allow(null).allow("").optional(),
        outbound_category_detail_id: Joi.number().allow(null).allow("").optional(),
        email_status_id: Joi.number().allow(null).allow("").optional(),
        is_complete: Joi.number().allow(null).allow("").optional(),
        uid: Joi.string().allow(null).allow("").optional(),
        campaign_id: Joi.number().allow(null).allow("").optional(),
        customer_id: Joi.number().allow(null).allow("").optional(),
        created_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("created_at must be a valid datetime format").allow(null).allow("").optional(),
        created_by: Joi.number().allow(null).allow("").optional(),
        updated_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("updated_at must be a valid datetime format").allow(null).allow("").optional(),
        updated_by: Joi.number().allow(null).allow("").optional(),
        send_error_attempt: Joi.string().allow(null).allow("").optional()
    })
}

module.exports = schemas
