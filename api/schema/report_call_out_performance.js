const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()
    }),
    create: Joi.object().keys({
        user_id: Joi.number().allow(null).allow("").optional(),
        direction: Joi.string().allow(null).allow("").optional(),
        username: Joi.string().allow(null).allow("").optional(),
        call_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("call_date must be a valid datetime format").allow(null).allow("").optional(),
        outgoing: Joi.number().allow(null).allow("").optional(),
        talk_duration: Joi.string().allow(null).allow("").optional(),
        avg_talk_duration: Joi.string().allow(null).allow("").optional(),
        acw_duration: Joi.string().allow(null).allow("").optional(),
        avg_acw_duration: Joi.string().allow(null).allow("").optional(),
        asa_duration: Joi.string().allow(null).allow("").optional(),
        avg_asa_duration: Joi.string().allow(null).allow("").optional(),
        paperwork_duration: Joi.string().allow(null).allow("").optional(),
        avg_paperwork_duration: Joi.string().allow(null).allow("").optional(),
        handling_duration: Joi.string().allow(null).allow("").optional(),
        avg_handling_duration: Joi.string().allow(null).allow("").optional(),
        connected: Joi.number().allow(null).allow("").optional(),
        contacted: Joi.number().allow(null).allow("").optional(),
        uncontacted: Joi.number().allow(null).allow("").optional(),
        unconnected: Joi.number().allow(null).allow("").optional(),
        invalid_no: Joi.number().allow(null).allow("").optional(),
        busyline: Joi.number().allow(null).allow("").optional(),
        fax_line: Joi.number().allow(null).allow("").optional(),
        temp_disconnect: Joi.number().allow(null).allow("").optional(),
        out_coverage: Joi.number().allow(null).allow("").optional(),
        not_active: Joi.number().allow(null).allow("").optional(),
        no_answer: Joi.number().allow(null).allow("").optional(),
        busy_line: Joi.number().allow(null).allow("").optional(),
        no_tone: Joi.number().allow(null).allow("").optional(),
        unregistered: Joi.number().allow(null).allow("").optional(),
        availeble_time: Joi.string().allow(null).allow("").optional(),
        staffed_time: Joi.string().allow(null).allow("").optional(),
        email_outgoing: Joi.number().allow(null).allow("").optional(),
        sms_outgoing: Joi.number().allow(null).allow("").optional(),
        first_login: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("first_login must be a valid datetime format").allow(null).allow("").optional(),
        first_break: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("first_break must be a valid datetime format").allow(null).allow("").optional(),
        last_break: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("last_break must be a valid datetime format").allow(null).allow("").optional(),
        last_logout: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("last_logout must be a valid datetime format").allow(null).allow("").optional(),
        total_break: Joi.number().allow(null).allow("").optional(),
        break_duration: Joi.string().allow(null).allow("").optional(),
        testcall: Joi.number().allow(null).allow("").optional(),
        followupticket: Joi.number().allow(null).allow("").optional(),
        testemail: Joi.number().allow(null).allow("").optional(),
        testsms: Joi.number().allow(null).allow("").optional(),
        testwhatsapp: Joi.number().allow(null).allow("").optional(),
    }),
    update: Joi.object().keys({
        user_id: Joi.number().allow(null).allow("").optional(),
        direction: Joi.string().allow(null).allow("").optional(),
        username: Joi.string().allow(null).allow("").optional(),
        call_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("call_date must be a valid datetime format").allow(null).allow("").optional(),
        outgoing: Joi.number().allow(null).allow("").optional(),
        talk_duration: Joi.string().allow(null).allow("").optional(),
        avg_talk_duration: Joi.string().allow(null).allow("").optional(),
        acw_duration: Joi.string().allow(null).allow("").optional(),
        avg_acw_duration: Joi.string().allow(null).allow("").optional(),
        asa_duration: Joi.string().allow(null).allow("").optional(),
        avg_asa_duration: Joi.string().allow(null).allow("").optional(),
        paperwork_duration: Joi.string().allow(null).allow("").optional(),
        avg_paperwork_duration: Joi.string().allow(null).allow("").optional(),
        handling_duration: Joi.string().allow(null).allow("").optional(),
        avg_handling_duration: Joi.string().allow(null).allow("").optional(),
        connected: Joi.number().allow(null).allow("").optional(),
        contacted: Joi.number().allow(null).allow("").optional(),
        uncontacted: Joi.number().allow(null).allow("").optional(),
        unconnected: Joi.number().allow(null).allow("").optional(),
        invalid_no: Joi.number().allow(null).allow("").optional(),
        busyline: Joi.number().allow(null).allow("").optional(),
        fax_line: Joi.number().allow(null).allow("").optional(),
        temp_disconnect: Joi.number().allow(null).allow("").optional(),
        out_coverage: Joi.number().allow(null).allow("").optional(),
        not_active: Joi.number().allow(null).allow("").optional(),
        no_answer: Joi.number().allow(null).allow("").optional(),
        busy_line: Joi.number().allow(null).allow("").optional(),
        no_tone: Joi.number().allow(null).allow("").optional(),
        unregistered: Joi.number().allow(null).allow("").optional(),
        availeble_time: Joi.string().allow(null).allow("").optional(),
        staffed_time: Joi.string().allow(null).allow("").optional(),
        email_outgoing: Joi.number().allow(null).allow("").optional(),
        sms_outgoing: Joi.number().allow(null).allow("").optional(),
        first_login: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("first_login must be a valid datetime format").allow(null).allow("").optional(),
        first_break: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("first_break must be a valid datetime format").allow(null).allow("").optional(),
        last_break: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("last_break must be a valid datetime format").allow(null).allow("").optional(),
        last_logout: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("last_logout must be a valid datetime format").allow(null).allow("").optional(),
        total_break: Joi.number().allow(null).allow("").optional(),
        break_duration: Joi.string().allow(null).allow("").optional(),
        testcall: Joi.number().allow(null).allow("").optional(),
        followupticket: Joi.number().allow(null).allow("").optional(),
        testemail: Joi.number().allow(null).allow("").optional(),
        testsms: Joi.number().allow(null).allow("").optional(),
        testwhatsapp: Joi.number().allow(null).allow("").optional(),
    })
}

module.exports = schemas