const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()

    }),
    create: Joi.object().keys({
        sort: Joi.string().allow(null).allow("").optional(),
        quality_assurance_id: Joi.number().allow(null).allow("").optional(),
        aspect_name: Joi.string().allow(null).allow("").optional(),
        bobot: Joi.string().allow(null).allow("").optional(),
        info: Joi.string().allow(null).allow("").optional(),
        is_active: Joi.number().allow(null).allow("").optional()
    }),
    update: Joi.object().keys({
        sort: Joi.string().allow(null).allow("").optional(),
        quality_assurance_id: Joi.number().allow(null).allow("").optional(),
        aspect_name: Joi.string().allow(null).allow("").optional(),
        bobot: Joi.string().allow(null).allow("").optional(),
        info: Joi.string().allow(null).allow("").optional(),
        is_active: Joi.number().allow(null).allow("").optional()
    }),
}

module.exports = schemas
