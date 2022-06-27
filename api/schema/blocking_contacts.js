const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()

    }),
    create: Joi.object().keys({
        media_id:Joi.number().allow(null).allow("").optional(),
contact_detail:Joi.string().allow(null).allow("").optional(),
note:Joi.string().allow(null).allow("").optional(),
is_active:Joi.number().valid(0,1).allow(null).allow("").optional(),
created:Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("created must be a valid datetime format").allow(null).allow("").optional(),
updated:Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("updated must be a valid datetime format").allow(null).allow("").optional()
    }),
    update: Joi.object().keys({
        media_id:Joi.number().allow(null).allow("").optional(),
contact_detail:Joi.string().allow(null).allow("").optional(),
note:Joi.string().allow(null).allow("").optional(),
is_active:Joi.number().valid(0,1).allow(null).allow("").optional(),
created:Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("created must be a valid datetime format").allow(null).allow("").optional(),
updated:Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("updated must be a valid datetime format").allow(null).allow("").optional()
    }),
}

module.exports = schemas
