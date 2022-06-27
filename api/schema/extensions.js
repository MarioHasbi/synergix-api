const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()

    }),
    create: Joi.object().keys({
        // insert here
        ext_no: Joi.string().allow(null).allow("").optional(),
        user_id: Joi.number().allow(null).allow("").optional(),
        interface: Joi.string().allow(null).allow("").optional(),
        peer_status: Joi.string().allow(null).allow("").optional(),
        updated_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("updated_at must be a valid datetime format").allow(null).allow("").optional(),
    }),
    update: Joi.object().keys({
        // insert here
        ext_no: Joi.string().allow(null).allow("").optional(),
        user_id: Joi.number().allow(null).allow("").optional(),
        interface: Joi.string().allow(null).allow("").optional(),
        peer_status: Joi.string().allow(null).allow("").optional(),
        updated_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("updated_at must be a valid datetime format").allow(null).allow("").optional(),
    }),
}

module.exports = schemas
