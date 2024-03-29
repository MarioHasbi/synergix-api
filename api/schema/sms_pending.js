const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()
    }),
    create: Joi.object().keys({
        is_blocking: Joi.number().allow(null).allow("").optional(),
        ticket_id: Joi.number().allow(null).allow("").optional(),
        direction_id: Joi.number().allow(null).allow("").optional(),
        sms_status_id: Joi.number().allow(null).allow("").optional(),
        media_status_detail_id: Joi.number().allow(null).allow("").optional(),
        queue_time: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("queue_time must be a valid datetime format").allow(null).allow("").optional(),
        process_time: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("process_time must be a valid datetime format").allow(null).allow("").optional(),
        message: Joi.string().allow(null).allow("").optional(),
        recipient: Joi.string().allow(null).allow("").optional(),
        reference: Joi.string().allow(null).allow("").optional(),
        delivery_report: Joi.number().allow(null).allow("").optional(),
        delivery_code: Joi.number().allow(null).allow("").optional(),
        delivery_status: Joi.string().allow(null).allow("").optional(),
        delivery_time: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("delivery_time must be a valid datetime format").allow(null).allow("").optional(),
        sender: Joi.string().allow(null).allow("").optional(),
        replied: Joi.number().allow(null).allow("").optional(),
        inbound_media_id: Joi.number().allow(null).allow("").optional(),
        inbound_media_record_id: Joi.number().allow(null).allow("").optional(),
        contact_name: Joi.string().allow(null).allow("").optional(),
        contact_type_id: Joi.number().allow(null).allow("").optional(),
        customer_id: Joi.number().allow(null).allow("").optional(),
        id_gammu: Joi.number().allow(null).allow("").optional(),
        read_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("read_at must be a valid datetime format").allow(null).allow("").optional(),
        read_by: Joi.number().allow(null).allow("").optional(),
        reply_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("reply_at must be a valid datetime format").allow(null).allow("").optional(),
        reply_by: Joi.number().allow(null).allow("").optional(),
        forward_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("forward_at must be a valid datetime format").allow(null).allow("").optional(),
        forward_by: Joi.number().allow(null).allow("").optional(),
        created_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("created_at must be a valid datetime format").allow(null).allow("").optional(),
        created_by: Joi.number().allow(null).allow("").optional(),
        updated_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("updated_at must be a valid datetime format").allow(null).allow("").optional(),
        updated_by: Joi.number().allow(null).allow("").optional(),
    }),

    update: Joi.object().keys({
        is_blocking: Joi.number().allow(null).allow("").optional(),
        ticket_id: Joi.number().allow(null).allow("").optional(),
        direction_id: Joi.number().allow(null).allow("").optional(),
        sms_status_id: Joi.number().allow(null).allow("").optional(),
        media_status_detail_id: Joi.number().allow(null).allow("").optional(),
        queue_time: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("queue_time must be a valid datetime format").allow(null).allow("").optional(),
        process_time: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("process_time must be a valid datetime format").allow(null).allow("").optional(),
        message: Joi.string().allow(null).allow("").optional(),
        recipient: Joi.string().allow(null).allow("").optional(),
        reference: Joi.string().allow(null).allow("").optional(),
        delivery_report: Joi.number().allow(null).allow("").optional(),
        delivery_code: Joi.number().allow(null).allow("").optional(),
        delivery_status: Joi.string().allow(null).allow("").optional(),
        delivery_time: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("delivery_time must be a valid datetime format").allow(null).allow("").optional(),
        sender: Joi.string().allow(null).allow("").optional(),
        replied: Joi.number().allow(null).allow("").optional(),
        inbound_media_id: Joi.number().allow(null).allow("").optional(),
        inbound_media_record_id: Joi.number().allow(null).allow("").optional(),
        contact_name: Joi.string().allow(null).allow("").optional(),
        contact_type_id: Joi.number().allow(null).allow("").optional(),
        customer_id: Joi.number().allow(null).allow("").optional(),
        id_gammu: Joi.number().allow(null).allow("").optional(),
        read_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("read_at must be a valid datetime format").allow(null).allow("").optional(),
        read_by: Joi.number().allow(null).allow("").optional(),
        reply_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("reply_at must be a valid datetime format").allow(null).allow("").optional(),
        reply_by: Joi.number().allow(null).allow("").optional(),
        forward_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("forward_at must be a valid datetime format").allow(null).allow("").optional(),
        forward_by: Joi.number().allow(null).allow("").optional(),
        created_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("created_at must be a valid datetime format").allow(null).allow("").optional(),
        created_by: Joi.number().allow(null).allow("").optional(),
        updated_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("updated_at must be a valid datetime format").allow(null).allow("").optional(),
        updated_by: Joi.number().allow(null).allow("").optional(),
    })
}

module.exports = schemas
