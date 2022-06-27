const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()

    }),
    create: Joi.object().keys({
        media_id: Joi.number().allow(null).allow("").optional(),
        direction_id: Joi.number().allow(null).allow("").optional(),
        media_record_id: Joi.number().allow(null).allow("").optional(),
        product_type_id: Joi.number().allow(null).allow("").optional(),
        product_type_name: Joi.string().allow(null).allow("").optional(),
        product_id: Joi.number().allow(null).allow("").optional(),
        product_name: Joi.string().allow(null).allow("").optional(),
        product_type_detail_sub_id: Joi.number().allow(null).allow("").optional(),
        product_type_detail_sub_name: Joi.string().allow(null).allow("").optional(),
        created_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("created_at must be a valid datetime format").allow(null).allow("").optional(),
        created_by: Joi.number().allow(null).allow("").optional(),
        is_active: Joi.number().valid(0,1).allow(null).allow("").optional()

    }),
    update: Joi.object().keys({
        media_id: Joi.number().allow(null).allow("").optional(),
        direction_id: Joi.number().allow(null).allow("").optional(),
        media_record_id: Joi.number().allow(null).allow("").optional(),
        product_type_id: Joi.number().allow(null).allow("").optional(),
        product_type_name: Joi.string().allow(null).allow("").optional(),
        product_id: Joi.number().allow(null).allow("").optional(),
        product_name: Joi.string().allow(null).allow("").optional(),
        product_type_detail_sub_id: Joi.number().allow(null).allow("").optional(),
        product_type_detail_sub_name: Joi.string().allow(null).allow("").optional(),
        created_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("created_at must be a valid datetime format").allow(null).allow("").optional(),
        created_by: Joi.number().allow(null).allow("").optional(),
        is_active: Joi.number().valid(0,1).allow(null).allow("").optional()
    }),
}

module.exports = schemas
