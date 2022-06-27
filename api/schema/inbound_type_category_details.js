const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()

    }),
    create: Joi.object().keys({
        // insert here
        sort: Joi.string().allow(null).allow("").optional(),
        contact_type_id: Joi.string().allow(null).allow("").optional(),
        code: Joi.string().allow(null).allow("").optional(),
        inbound_type_detail_id: Joi.number().allow(null).allow("").optional(),
        name: Joi.string().allow(null).allow("").optional(),
        is_active: Joi.number().allow(null).allow("").optional(),
        is_req_copy: Joi.number().allow(null).allow("").optional(),
        is_req_update: Joi.number().allow(null).allow("").optional(),
    }),
    update: Joi.object().keys({
        // insert here
        sort: Joi.string().allow(null).allow("").optional(),
        contact_type_id: Joi.string().allow(null).allow("").optional(),
        code: Joi.string().allow(null).allow("").optional(),
        inbound_type_detail_id: Joi.number().allow(null).allow("").optional(),
        name: Joi.string().allow(null).allow("").optional(),
        is_active: Joi.number().allow(null).allow("").optional(),
        is_req_copy: Joi.number().allow(null).allow("").optional(),
        is_req_update: Joi.number().allow(null).allow("").optional(),
    }),
}

module.exports = schemas
