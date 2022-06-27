const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()

    }),
    create: Joi.object().keys({
        // insert here
        sort: Joi.number().allow(null).allow("").optional(),
        code: Joi.string().allow(null).allow("").optional(),
        name: Joi.string().allow(null).allow("").optional(),
        cordinator: Joi.string().allow(null).allow("").optional(),
        pic_user: Joi.string().allow(null).allow("").optional(),
        pic_manager: Joi.string().allow(null).allow("").optional(),
        pic_email: Joi.string().allow(null).allow("").optional(),
        pic_email_cc: Joi.string().allow(null).allow("").optional(),
        pic_phone: Joi.string().allow(null).allow("").optional(),
        pic_mobile: Joi.string().allow(null).allow("").optional(),
        address: Joi.string().allow(null).allow("").optional(),
        info: Joi.string().allow(null).allow("").optional(),
        is_department: Joi.number().allow(null).allow("").optional(),
        is_service_department: Joi.number().allow(null).allow("").optional(),
        is_dispatcher: Joi.number().allow(null).allow("").optional(),
        is_cc: Joi.number().allow(null).allow("").optional(),
        is_default: Joi.number().allow(null).allow("").optional(),
        is_active: Joi.number().allow(null).allow("").optional(),
        is_su: Joi.number().allow(null).allow("").optional(),
        created_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("created_at must be a valid datetime format").allow(null).allow("").optional(),
        created_by: Joi.number().allow(null).allow("").optional(),
        updated_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("updated_at must be a valid datetime format").allow(null).allow("").optional(),
        updated_by: Joi.number().allow(null).allow("").optional(),
        is_req_copy: Joi.number().allow(null).allow("").optional(),
        is_req_update: Joi.number().allow(null).allow("").optional(),
    }),
    update: Joi.object().keys({
        // insert here
        sort: Joi.number().allow(null).allow("").optional(),
        code: Joi.string().allow(null).allow("").optional(),
        name: Joi.string().allow(null).allow("").optional(),
        cordinator: Joi.string().allow(null).allow("").optional(),
        pic_user: Joi.string().allow(null).allow("").optional(),
        pic_manager: Joi.string().allow(null).allow("").optional(),
        pic_email: Joi.string().allow(null).allow("").optional(),
        pic_email_cc: Joi.string().allow(null).allow("").optional(),
        pic_phone: Joi.string().allow(null).allow("").optional(),
        pic_mobile: Joi.string().allow(null).allow("").optional(),
        address: Joi.string().allow(null).allow("").optional(),
        info: Joi.string().allow(null).allow("").optional(),
        is_department: Joi.number().allow(null).allow("").optional(),
        is_service_department: Joi.number().allow(null).allow("").optional(),
        is_dispatcher: Joi.number().allow(null).allow("").optional(),
        is_cc: Joi.number().allow(null).allow("").optional(),
        is_default: Joi.number().allow(null).allow("").optional(),
        is_active: Joi.number().allow(null).allow("").optional(),
        is_su: Joi.number().allow(null).allow("").optional(),
        created_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("created_at must be a valid datetime format").allow(null).allow("").optional(),
        created_by: Joi.number().allow(null).allow("").optional(),
        updated_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("updated_at must be a valid datetime format").allow(null).allow("").optional(),
        updated_by: Joi.number().allow(null).allow("").optional(),
        is_req_copy: Joi.number().allow(null).allow("").optional(),
        is_req_update: Joi.number().allow(null).allow("").optional(),
    }),
}

module.exports = schemas
