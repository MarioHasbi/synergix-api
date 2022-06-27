const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()

    }),
    create: Joi.object().keys({
        // insert here
        media_id: Joi.string().allow(null).allow("").optional(),
        contact_type_id: Joi.string().allow(null).allow("").optional(),
        sort: Joi.number().allow(null).allow("").optional(),
        code: Joi.string().allow(null).allow("").optional(),
        name: Joi.string().allow(null).allow("").optional(),
        info: Joi.string().allow(null).allow("").optional(),
        is_default: Joi.number().allow(null).allow("").optional(),
        is_cc: Joi.number().allow(null).allow("").optional(),
        is_ticket: Joi.number().allow(null).allow("").optional(),
        is_active: Joi.number().allow(null).allow("").optional(),
        is_has_child: Joi.number().allow(null).allow("").optional(),
        is_require_ticket: Joi.number().allow(null).allow("").optional(),
        is_require_tag_ticket: Joi.number().allow(null).allow("").optional(),
        is_req_copy: Joi.number().allow(null).allow("").optional(),
        is_req_update: Joi.number().allow(null).allow("").optional(),
    }),
    update: Joi.object().keys({
        // insert here
        media_id: Joi.string().allow(null).allow("").optional(),
        contact_type_id: Joi.string().allow(null).allow("").optional(),
        sort: Joi.number().allow(null).allow("").optional(),
        code: Joi.string().allow(null).allow("").optional(),
        name: Joi.string().allow(null).allow("").optional(),
        info: Joi.string().allow(null).allow("").optional(),
        is_default: Joi.number().allow(null).allow("").optional(),
        is_cc: Joi.number().allow(null).allow("").optional(),
        is_ticket: Joi.number().allow(null).allow("").optional(),
        is_active: Joi.number().allow(null).allow("").optional(),
        is_has_child: Joi.number().allow(null).allow("").optional(),
        is_require_ticket: Joi.number().allow(null).allow("").optional(),
        is_require_tag_ticket: Joi.number().allow(null).allow("").optional(),
        is_req_copy: Joi.number().allow(null).allow("").optional(),
        is_req_update: Joi.number().allow(null).allow("").optional(),
    }),
}

module.exports = schemas
