const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()

    }),
    create: Joi.object().keys({
        queue: Joi.string().allow(null).allow("").optional(),
        extension: Joi.string().allow(null).allow("").optional(),
        is_paused: Joi.number().valid(0, 1).allow(null).allow("").optional()

    }),
    update: Joi.object().keys({

        queue: Joi.string().allow(null).allow("").optional(),
        extension: Joi.string().allow(null).allow("").optional(),
        is_paused: Joi.number().valid(0, 1).allow(null).allow("").optional()
    }),
}

module.exports = schemas
