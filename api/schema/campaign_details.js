const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()

    }),
    create: Joi.object().keys({
        tenor: Joi.string().min(1).required(),
        bunga: Joi.string().min(1).required(),
        nominal: Joi.string().min(1).required(),
        limits: Joi.string().min(1).required()
    }),
    update: Joi.object().keys({
        tenor: Joi.string().allow(null).allow("").optional(),
        bunga: Joi.string().allow(null).allow("").optional(),
        nominal: Joi.string().allow(null).allow("").optional(),
        limits: Joi.string().allow(null).allow("").optional(),
    }),
}

module.exports = schemas
