const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()

    }),
    create: Joi.object().keys({
        media_id: Joi.number().allow(null).allow("").optional(),
        media_record_id: Joi.number().allow(null).allow("").optional(),
        ticket_id: Joi.number().allow(null).allow("").optional(),
        direction_id: Joi.number().allow(null).allow("").optional(),
        user_id: Joi.number().allow(null).allow("").optional(),
        customer_id: Joi.number().allow(null).allow("").optional(),
        customer_name: Joi.string().allow(null).allow("").optional(),
        no_rekening: Joi.string().allow(null).allow("").optional(),
        ticket_type: Joi.string().allow(null).allow("").optional(),
        ticket_category: Joi.string().allow(null).allow("").optional(),
        ticket_category_detail: Joi.string().allow(null).allow("").optional(),
        ticket_subcategory: Joi.string().allow(null).allow("").optional(),
        detail: Joi.string().allow(null).allow("").optional(),
        contact: Joi.string().allow(null).allow("").optional(),
        created: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("created must be a valid datetime format").allow(null).allow("").optional(),
        updated_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("updated_at must be a valid datetime format").allow(null).allow("").optional(),
        updated_by: Joi.number().allow(null).allow("").optional(),
        is_active: Joi.number().valid(0, 1).allow(null).allow("").optional(),
        is_tagging: Joi.number().valid(0, 1).allow(null).allow("").optional()

    }),
    update: Joi.object().keys({
        media_id: Joi.number().allow(null).allow("").optional(),
        media_record_id: Joi.number().allow(null).allow("").optional(),
        ticket_id: Joi.number().allow(null).allow("").optional(),
        direction_id: Joi.number().allow(null).allow("").optional(),
        user_id: Joi.number().allow(null).allow("").optional(),
        customer_id: Joi.number().allow(null).allow("").optional(),
        customer_name: Joi.string().allow(null).allow("").optional(),
        no_rekening: Joi.string().allow(null).allow("").optional(),
        ticket_type: Joi.string().allow(null).allow("").optional(),
        ticket_category: Joi.string().allow(null).allow("").optional(),
        ticket_category_detail: Joi.string().allow(null).allow("").optional(),
        ticket_subcategory: Joi.string().allow(null).allow("").optional(),
        detail: Joi.string().allow(null).allow("").optional(),
        contact: Joi.string().allow(null).allow("").optional(),
        created: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("created must be a valid datetime format").allow(null).allow("").optional(),
        updated_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("updated_at must be a valid datetime format").allow(null).allow("").optional(),
        updated_by: Joi.number().allow(null).allow("").optional(),
        is_active: Joi.number().valid(0, 1).allow(null).allow("").optional(),
        is_tagging: Joi.number().valid(0, 1).allow(null).allow("").optional()
    }),
}

module.exports = schemas
