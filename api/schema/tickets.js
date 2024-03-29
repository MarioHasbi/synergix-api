const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    create: Joi.object().keys({ 
        ticket_status_id: Joi.number().min(1).required(),
        department_id: Joi.number().min(1),
        ticket_priority_id: Joi.number().min(1),
        ticket_type_id: Joi.number().min(1),
        ticket_category_id: Joi.number().min(1),
        ticket_subcategory_id: Joi.number().min(1),
        media_id: Joi.number().min(1),
        media_record_id: Joi.number().min(1),
        customer_type_id: Joi.number().min(1),
        is_over_sla: Joi.number().valid(0,1), 
        open_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message('open_date must be a valid datetime format').required(),
        process_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message('process_date must be a valid datetime format'),
        assign_back_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message('assign_back_date must be a valid datetime format'),
        resolve_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message('resolve_date must be a valid datetime format'),
        close_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message('close_date must be a valid datetime format'),
        cancel_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message('cancel_date must be a valid datetime format'),
        media_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message('media_date must be a valid datetime format'),
        open_user_id: Joi.number().min(1).required(),
        open_department_id: Joi.number().min(1),
        process_user_id: Joi.number().min(1),
        process_department_id: Joi.number().min(1),
        assign_back_user_id: Joi.number().min(1),
        assign_back_department_id: Joi.number().min(1),
        resolve_user_id: Joi.number().min(1),
        resolve_department_id: Joi.number().min(1),
        close_user_id: Joi.number().min(1),
        close_department_id: Joi.number().min(1),
        cancel_user_id: Joi.number().min(1),
        cancel_department_id: Joi.number().min(1),
    }).unknown(true),
    update: Joi.object().keys({ 
        ticket_status_id: Joi.number().min(1),
        department_id: Joi.number().min(1),
        ticket_priority_id: Joi.number().min(1),
        ticket_type_id: Joi.number().min(1),
        ticket_category_id: Joi.number().min(1),
        ticket_subcategory_id: Joi.number().min(1),
        media_id: Joi.number().min(1),
        media_record_id: Joi.number().min(1),
        customer_type_id: Joi.number().min(1),
        is_over_sla: Joi.number().valid(0,1),
        open_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message('open_date must be a valid datetime format'),
        process_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message('process_date must be a valid datetime format'),
        assign_back_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message('assign_back_date must be a valid datetime format'),
        resolve_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message('resolve_date must be a valid datetime format'),
        close_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message('close_date must be a valid datetime format'),
        cancel_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message('cancel_date must be a valid datetime format'),
        media_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message('media_date must be a valid datetime format'),
        open_user_id: Joi.number().min(1),
        open_department_id: Joi.number().min(1),
        process_user_id: Joi.number().min(1),
        process_department_id: Joi.number().min(1),
        assign_back_user_id: Joi.number().min(1),
        assign_back_department_id: Joi.number().min(1),
        resolve_user_id: Joi.number().min(1),
        resolve_department_id: Joi.number().min(1),
        close_user_id: Joi.number().min(1),
        close_department_id: Joi.number().min(1),
        cancel_user_id: Joi.number().min(1),
        cancel_department_id: Joi.number().min(1),
    }).unknown(true),
    detail: Joi.object().keys({ 
        id: Joi.number().min(1).required()
    }),
    upload: Joi.object().keys({
        user_id: Joi.number().min(1).required()
    }),
    histories: Joi.object().keys({
        ticket_status_id: Joi.number().min(1).required(),
        user_id: Joi.number().min(1).required(),
        note: Joi.string().required()
    }),
} 

module.exports = schemas