const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()
    }),
    create: Joi.object().keys({
        user_id: Joi.number().allow(null).allow("").optional(),
        username: Joi.string().allow(null).allow("").optional(),
        call_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("call_date must be a valid datetime format").allow(null).allow("").optional(),
        incoming: Joi.number().allow(null).allow("").optional(),
        answered: Joi.number().allow(null).allow("").optional(),
        abandon: Joi.number().allow(null).allow("").optional(),
        abandon_ivr: Joi.number().allow(null).allow("").optional(),
        abandon_queue: Joi.number().allow(null).allow("").optional(),
        abandon_transfer: Joi.number().allow(null).allow("").optional(),
        abandon_agent: Joi.number().allow(null).allow("").optional(),
        ringing: Joi.string().allow(null).allow("").optional(),
        avg_ringing: Joi.string().allow(null).allow("").optional(),
        talktime: Joi.string().allow(null).allow("").optional(),
        avg_talktime: Joi.string().allow(null).allow("").optional(),
        speed_answer: Joi.string().allow(null).allow("").optional(),
        avg_speed_answer: Joi.string().allow(null).allow("").optional(),
        acw_time: Joi.string().allow(null).allow("").optional(),
        avg_acw_time: Joi.string().allow(null).allow("").optional(),
        paperwork_time: Joi.string().allow(null).allow("").optional(),
        avg_paperwork_time: Joi.string().allow(null).allow("").optional(),
        avg_handling_time: Joi.string().allow(null).allow("").optional(),
        other_time: Joi.string().allow(null).allow("").optional(),
        available_time: Joi.string().allow(null).allow("").optional(),
        staffed_time: Joi.string().allow(null).allow("").optional(),
        occupancy_rate: Joi.string().allow(null).allow("").optional(),
        call_hour: Joi.string().allow(null).allow("").optional(),
        sr_inbound: Joi.number().allow(null).allow("").optional(),
        ocr_inbound: Joi.number().allow(null).allow("").optional(),
        blankcall: Joi.number().allow(null).allow("").optional(),
        testcall: Joi.number().allow(null).allow("").optional(),
        prankcall: Joi.number().allow(null).allow("").optional(),
        wrongnumber: Joi.number().allow(null).allow("").optional(),
        inquiry: Joi.number().allow(null).allow("").optional(),
        complaint: Joi.number().allow(null).allow("").optional(),
        request: Joi.number().allow(null).allow("").optional(),
        outgoing: Joi.number().allow(null).allow("").optional(),
        connected: Joi.number().allow(null).allow("").optional(),
        unconnected: Joi.number().allow(null).allow("").optional(),
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
        contacted: Joi.number().allow(null).allow("").optional(),
        uncontacted: Joi.number().allow(null).allow("").optional(),
        busy: Joi.number().allow(null).allow("").optional(),
        disconnected: Joi.number().allow(null).allow("").optional(),
        leave_message: Joi.number().allow(null).allow("").optional(),
        not_at_home: Joi.number().allow(null).allow("").optional(),
        not_available: Joi.number().allow(null).allow("").optional(),
        online: Joi.number().allow(null).allow("").optional(),
        unknown: Joi.number().allow(null).allow("").optional(),
        other: Joi.number().allow(null).allow("").optional(),
        wrong_number: Joi.number().allow(null).allow("").optional(),
        meeting: Joi.number().allow(null).allow("").optional(),
        busy_line: Joi.number().allow(null).allow("").optional(),
        no_answer: Joi.number().allow(null).allow("").optional(),
        no_tone: Joi.number().allow(null).allow("").optional(),
        invalid_no: Joi.number().allow(null).allow("").optional(),
        fax_line: Joi.number().allow(null).allow("").optional(),
        temp_disconnect: Joi.number().allow(null).allow("").optional(),
        out_coverage: Joi.number().allow(null).allow("").optional(),
        not_active: Joi.number().allow(null).allow("").optional(),
        availeble_time: Joi.string().allow(null).allow("").optional(),
        follow_ticket: Joi.number().allow(null).allow("").optional(),
        internal_coordination: Joi.number().allow(null).allow("").optional(),
        confirmation: Joi.number().allow(null).allow("").optional(),
        prospect: Joi.number().allow(null).allow("").optional(),
        first_login: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("first_login must be a valid datetime format").allow(null).allow("").optional(),
        last_logout: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("last_logout must be a valid datetime format").allow(null).allow("").optional(),
        first_break: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("first_break must be a valid datetime format").allow(null).allow("").optional(),
        break_time: Joi.string().allow(null).allow("").optional(),
        break_duration: Joi.string().allow(null).allow("").optional(),
        last_break: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("last_break must be a valid datetime format").allow(null).allow("").optional(),
        available_duration: Joi.string().allow(null).allow("").optional(),
        total_break: Joi.number().allow(null).allow("").optional(),
        test: Joi.number().allow(null).allow("").optional(),
        others: Joi.number().allow(null).allow("").optional(),
    }),
    update: Joi.object().keys({
        user_id: Joi.number().allow(null).allow("").optional(),
        username: Joi.string().allow(null).allow("").optional(),
        call_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("call_date must be a valid datetime format").allow(null).allow("").optional(),
        incoming: Joi.number().allow(null).allow("").optional(),
        answered: Joi.number().allow(null).allow("").optional(),
        abandon: Joi.number().allow(null).allow("").optional(),
        abandon_ivr: Joi.number().allow(null).allow("").optional(),
        abandon_queue: Joi.number().allow(null).allow("").optional(),
        abandon_transfer: Joi.number().allow(null).allow("").optional(),
        abandon_agent: Joi.number().allow(null).allow("").optional(),
        ringing: Joi.string().allow(null).allow("").optional(),
        avg_ringing: Joi.string().allow(null).allow("").optional(),
        talktime: Joi.string().allow(null).allow("").optional(),
        avg_talktime: Joi.string().allow(null).allow("").optional(),
        speed_answer: Joi.string().allow(null).allow("").optional(),
        avg_speed_answer: Joi.string().allow(null).allow("").optional(),
        acw_time: Joi.string().allow(null).allow("").optional(),
        avg_acw_time: Joi.string().allow(null).allow("").optional(),
        paperwork_time: Joi.string().allow(null).allow("").optional(),
        avg_paperwork_time: Joi.string().allow(null).allow("").optional(),
        avg_handling_time: Joi.string().allow(null).allow("").optional(),
        other_time: Joi.string().allow(null).allow("").optional(),
        available_time: Joi.string().allow(null).allow("").optional(),
        staffed_time: Joi.string().allow(null).allow("").optional(),
        occupancy_rate: Joi.string().allow(null).allow("").optional(),
        call_hour: Joi.string().allow(null).allow("").optional(),
        sr_inbound: Joi.number().allow(null).allow("").optional(),
        ocr_inbound: Joi.number().allow(null).allow("").optional(),
        blankcall: Joi.number().allow(null).allow("").optional(),
        testcall: Joi.number().allow(null).allow("").optional(),
        prankcall: Joi.number().allow(null).allow("").optional(),
        wrongnumber: Joi.number().allow(null).allow("").optional(),
        inquiry: Joi.number().allow(null).allow("").optional(),
        complaint: Joi.number().allow(null).allow("").optional(),
        request: Joi.number().allow(null).allow("").optional(),
        outgoing: Joi.number().allow(null).allow("").optional(),
        connected: Joi.number().allow(null).allow("").optional(),
        unconnected: Joi.number().allow(null).allow("").optional(),
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
        contacted: Joi.number().allow(null).allow("").optional(),
        uncontacted: Joi.number().allow(null).allow("").optional(),
        busy: Joi.number().allow(null).allow("").optional(),
        disconnected: Joi.number().allow(null).allow("").optional(),
        leave_message: Joi.number().allow(null).allow("").optional(),
        not_at_home: Joi.number().allow(null).allow("").optional(),
        not_available: Joi.number().allow(null).allow("").optional(),
        online: Joi.number().allow(null).allow("").optional(),
        unknown: Joi.number().allow(null).allow("").optional(),
        other: Joi.number().allow(null).allow("").optional(),
        wrong_number: Joi.number().allow(null).allow("").optional(),
        meeting: Joi.number().allow(null).allow("").optional(),
        busy_line: Joi.number().allow(null).allow("").optional(),
        no_answer: Joi.number().allow(null).allow("").optional(),
        no_tone: Joi.number().allow(null).allow("").optional(),
        invalid_no: Joi.number().allow(null).allow("").optional(),
        fax_line: Joi.number().allow(null).allow("").optional(),
        temp_disconnect: Joi.number().allow(null).allow("").optional(),
        out_coverage: Joi.number().allow(null).allow("").optional(),
        not_active: Joi.number().allow(null).allow("").optional(),
        availeble_time: Joi.string().allow(null).allow("").optional(),
        follow_ticket: Joi.number().allow(null).allow("").optional(),
        internal_coordination: Joi.number().allow(null).allow("").optional(),
        confirmation: Joi.number().allow(null).allow("").optional(),
        prospect: Joi.number().allow(null).allow("").optional(),
        first_login: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("first_login must be a valid datetime format").allow(null).allow("").optional(),
        last_logout: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("last_logout must be a valid datetime format").allow(null).allow("").optional(),
        first_break: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("first_break must be a valid datetime format").allow(null).allow("").optional(),
        break_time: Joi.string().allow(null).allow("").optional(),
        break_duration: Joi.string().allow(null).allow("").optional(),
        last_break: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("last_break must be a valid datetime format").allow(null).allow("").optional(),
        available_duration: Joi.string().allow(null).allow("").optional(),
        total_break: Joi.number().allow(null).allow("").optional(),
        test: Joi.number().allow(null).allow("").optional(),
        others: Joi.number().allow(null).allow("").optional(),
    })
}

module.exports = schemas