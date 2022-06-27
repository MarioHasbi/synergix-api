const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    queueDetail: Joi.object().keys({
        id: Joi.string().required()
    }),
    queueMemberUpdate: Joi.object().keys({
        user_id: Joi.number().min(1).required(),
        extension: Joi.string().required(),
        action: Joi.string().valid('add', 'remove').required(),
        user_activity_id: Joi.number().min(1).required()
    }),
    queueMemberStatusUpdate: Joi.object().keys({
        user_id: Joi.number().min(1).required(),
        extension: Joi.string().required(),
        is_paused: Joi.boolean().required(),
        user_activity_id: Joi.number().min(1).required()
    }),
}

module.exports = schemas
