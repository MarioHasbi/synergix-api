const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    logout: Joi.object().keys({ 
        extension: Joi.number().required()
    })
}

module.exports = schemas
