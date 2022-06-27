const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()

    }),
    create: Joi.object().keys({
        // insert here
        email_id: Joi.number().allow(null).allow("").optional(),
        path: Joi.string().allow(null).allow("").optional(),
        filename: Joi.string().allow(null).allow("").optional(),
        file_size: Joi.string().allow(null).allow("").optional(),
        mime_type: Joi.string().allow(null).allow("").optional(),
    }),
    update: Joi.object().keys({
        // insert here
        email_id: Joi.number().allow(null).allow("").optional(),
        path: Joi.string().allow(null).allow("").optional(),
        filename: Joi.string().allow(null).allow("").optional(),
        file_size: Joi.string().allow(null).allow("").optional(),
        mime_type: Joi.string().allow(null).allow("").optional(),
    }),
}

module.exports = schemas
