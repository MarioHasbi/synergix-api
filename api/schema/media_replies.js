const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()

    }),
    create: Joi.object().keys({
        media_id: Joi.number().allow(null).allow("").optional(),
        media_record_id: Joi.number().allow(null).allow("").optional(),
        media_record_reply_id: Joi.number().allow(null).allow("").optional(),
        media_status_reply_id: Joi.number().allow(null).allow("").optional(),
        media_status_reply_detail_id: Joi.number().allow(null).allow("").optional()
    }),
    update: Joi.object().keys({
        media_id: Joi.number().allow(null).allow("").optional(),
        media_record_id: Joi.number().allow(null).allow("").optional(),
        media_record_reply_id: Joi.number().allow(null).allow("").optional(),
        media_status_reply_id: Joi.number().allow(null).allow("").optional(),
        media_status_reply_detail_id: Joi.number().allow(null).allow("").optional()
    }),
}

module.exports = schemas
