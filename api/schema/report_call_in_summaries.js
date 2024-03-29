const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()
    }),
    create: Joi.object().keys({
        direction:Joi.string().allow(null).allow("").optional(),
        call_date:Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("call_date must be a valid datetime format").allow(null).allow("").optional(),
        call_hour:Joi.string().allow(null).allow("").optional(),
        created:Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("created must be a valid datetime format").allow(null).allow("").optional(),
        updated:Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("updated must be a valid datetime format").allow(null).allow("").optional(),
        total_call:Joi.number().allow(null).allow("").optional(),
        avg_total_call:Joi.number().allow(null).allow("").optional(),
        answered:Joi.number().allow(null).allow("").optional(),
        answered_kurang_dua_puluh_detik:Joi.number().allow(null).allow("").optional(),
        answered_lebih_dua_puluh_detik:Joi.number().allow(null).allow("").optional(),
        avg_answered:Joi.string().allow(null).allow("").optional(),
        abandon:Joi.number().allow(null).allow("").optional(),
        avg_abandon:Joi.string().allow(null).allow("").optional(),
        voicemail:Joi.number().allow(null).allow("").optional(),
        disconnect_voicemail:Joi.number().allow(null).allow("").optional(),
        avg_disconnect_voicemail:Joi.string().allow(null).allow("").optional(),
        avg_voicemail:Joi.string().allow(null).allow("").optional(),
        disconnect_ivr:Joi.number().allow(null).allow("").optional(),
        avg_disconnect_ivr:Joi.string().allow(null).allow("").optional(),
        disconnect_queue:Joi.number().allow(null).allow("").optional(),
        avg_disconnect_queue:Joi.string().allow(null).allow("").optional(),
        disconnect_agent:Joi.number().allow(null).allow("").optional(),
        avg_disconnect_agent:Joi.string().allow(null).allow("").optional(),
        disconnect_transfer:Joi.number().allow(null).allow("").optional(),
        avg_disconnect_transfer:Joi.string().allow(null).allow("").optional(),
        disconnect_on_voicemail:Joi.number().allow(null).allow("").optional(),
        avg_disconnect_on_voicemail:Joi.string().allow(null).allow("").optional(),
        ivr_duration:Joi.string().allow(null).allow("").optional(),
        avg_ivr_duration:Joi.string().allow(null).allow("").optional(),
        queue_duration:Joi.string().allow(null).allow("").optional(),
        avg_queue_duration:Joi.string().allow(null).allow("").optional(),
        transfer_duration:Joi.string().allow(null).allow("").optional(),
        avg_transfer_duration:Joi.string().allow(null).allow("").optional(),
        ringing_duration:Joi.string().allow(null).allow("").optional(),
        avg_ringing_duration:Joi.string().allow(null).allow("").optional(),
        speed_answer:Joi.string().allow(null).allow("").optional(),
        avg_speed_answer:Joi.string().allow(null).allow("").optional(),
        talk_duration:Joi.string().allow(null).allow("").optional(),
        avg_talk_duration:Joi.string().allow(null).allow("").optional(),
        hold_duration:Joi.string().allow(null).allow("").optional(),
        avg_hold_duration:Joi.string().allow(null).allow("").optional(),
        mute_duration:Joi.string().allow(null).allow("").optional(),
        avg_mute_duration:Joi.string().allow(null).allow("").optional(),
        after_call_work:Joi.string().allow(null).allow("").optional(),
        avg_after_call_work:Joi.string().allow(null).allow("").optional(),
        handling_time:Joi.string().allow(null).allow("").optional(),
        avg_handling_time:Joi.string().allow(null).allow("").optional(),
        avg_disconnect_on_ivr_duration:Joi.string().allow(null).allow("").optional(),
        avg_disconnect_on_queue_duration:Joi.string().allow(null).allow("").optional(),
        avg_disconnect_on_agent_duration:Joi.string().allow(null).allow("").optional(),
        avg_disconnect_on_transfer_duration:Joi.string().allow(null).allow("").optional(),
        blankcall:Joi.number().allow(null).allow("").optional(),
        prankcall:Joi.number().allow(null).allow("").optional(),
        testcall:Joi.number().allow(null).allow("").optional(),
        wrongnumber:Joi.number().allow(null).allow("").optional(),
        inquiry:Joi.number().allow(null).allow("").optional(),
        request:Joi.number().allow(null).allow("").optional(),
        complaint:Joi.number().allow(null).allow("").optional(),
        followup:Joi.number().allow(null).allow("").optional(),
        request_time:Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("request_time must be a valid datetime format").allow(null).allow("").optional(),
        key_field:Joi.string().allow(null).allow("").optional(),
        followupvoicemail:Joi.number().allow(null).allow("").optional(),
        abandon_transfer_duration:Joi.string().allow(null).allow("").optional(),
        avg_abandon_transfer_duration:Joi.string().allow(null).allow("").optional(),
        abandon_agent_duration:Joi.string().allow(null).allow("").optional(),
        avg_abandon_agent_duration:Joi.string().allow(null).allow("").optional(),
        abandon_voicemail_duration:Joi.string().allow(null).allow("").optional(),
        avg_abandon_voicemail_duration:Joi.string().allow(null).allow("").optional(),
        abandon_ivr:Joi.number().allow(null).allow("").optional(),
        abandon_ivr_terminated:Joi.number().allow(null).allow("").optional(),
        abandon_ivr_early:Joi.number().allow(null).allow("").optional(),
        abandon_queue:Joi.number().allow(null).allow("").optional(),
        abandon_transfer:Joi.number().allow(null).allow("").optional(),
        abandon_agent:Joi.number().allow(null).allow("").optional(),
        inquiry_saldo:Joi.number().allow(null).allow("").optional(),
        inquiry_mutasi:Joi.number().allow(null).allow("").optional(),
        request_jak_one_mobile:Joi.number().allow(null).allow("").optional(),
        request_cms_va:Joi.number().allow(null).allow("").optional(),
        request_edc:Joi.number().allow(null).allow("").optional(),
        request_block_card:Joi.number().allow(null).allow("").optional(),
        complain_edc:Joi.number().allow(null).allow("").optional(),
        complain_jakcard:Joi.number().allow(null).allow("").optional(),
        complain_jakmobile:Joi.number().allow(null).allow("").optional(),
        complain_jakmobile_user:Joi.number().allow(null).allow("").optional(),
        complain_layanan:Joi.number().allow(null).allow("").optional(),
        complain_mesin_atm:Joi.number().allow(null).allow("").optional(),
        complain_pembayaran:Joi.number().allow(null).allow("").optional(),
        complain_transfer:Joi.number().allow(null).allow("").optional(),
        complain_tunai:Joi.number().allow(null).allow("").optional(),
    }),
    update: Joi.object().keys({ 
        direction:Joi.string().allow(null).allow("").optional(),
        call_date:Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("call_date must be a valid datetime format").allow(null).allow("").optional(),
        call_hour:Joi.string().allow(null).allow("").optional(),
        created:Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("created must be a valid datetime format").allow(null).allow("").optional(),
        updated:Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("updated must be a valid datetime format").allow(null).allow("").optional(),
        total_call:Joi.number().allow(null).allow("").optional(),
        avg_total_call:Joi.number().allow(null).allow("").optional(),
        answered:Joi.number().allow(null).allow("").optional(),
        answered_kurang_dua_puluh_detik:Joi.number().allow(null).allow("").optional(),
        answered_lebih_dua_puluh_detik:Joi.number().allow(null).allow("").optional(),
        avg_answered:Joi.string().allow(null).allow("").optional(),
        abandon:Joi.number().allow(null).allow("").optional(),
        avg_abandon:Joi.string().allow(null).allow("").optional(),
        voicemail:Joi.number().allow(null).allow("").optional(),
        disconnect_voicemail:Joi.number().allow(null).allow("").optional(),
        avg_disconnect_voicemail:Joi.string().allow(null).allow("").optional(),
        avg_voicemail:Joi.string().allow(null).allow("").optional(),
        disconnect_ivr:Joi.number().allow(null).allow("").optional(),
        avg_disconnect_ivr:Joi.string().allow(null).allow("").optional(),
        disconnect_queue:Joi.number().allow(null).allow("").optional(),
        avg_disconnect_queue:Joi.string().allow(null).allow("").optional(),
        disconnect_agent:Joi.number().allow(null).allow("").optional(),
        avg_disconnect_agent:Joi.string().allow(null).allow("").optional(),
        disconnect_transfer:Joi.number().allow(null).allow("").optional(),
        avg_disconnect_transfer:Joi.string().allow(null).allow("").optional(),
        disconnect_on_voicemail:Joi.number().allow(null).allow("").optional(),
        avg_disconnect_on_voicemail:Joi.string().allow(null).allow("").optional(),
        ivr_duration:Joi.string().allow(null).allow("").optional(),
        avg_ivr_duration:Joi.string().allow(null).allow("").optional(),
        queue_duration:Joi.string().allow(null).allow("").optional(),
        avg_queue_duration:Joi.string().allow(null).allow("").optional(),
        transfer_duration:Joi.string().allow(null).allow("").optional(),
        avg_transfer_duration:Joi.string().allow(null).allow("").optional(),
        ringing_duration:Joi.string().allow(null).allow("").optional(),
        avg_ringing_duration:Joi.string().allow(null).allow("").optional(),
        speed_answer:Joi.string().allow(null).allow("").optional(),
        avg_speed_answer:Joi.string().allow(null).allow("").optional(),
        talk_duration:Joi.string().allow(null).allow("").optional(),
        avg_talk_duration:Joi.string().allow(null).allow("").optional(),
        hold_duration:Joi.string().allow(null).allow("").optional(),
        avg_hold_duration:Joi.string().allow(null).allow("").optional(),
        mute_duration:Joi.string().allow(null).allow("").optional(),
        avg_mute_duration:Joi.string().allow(null).allow("").optional(),
        after_call_work:Joi.string().allow(null).allow("").optional(),
        avg_after_call_work:Joi.string().allow(null).allow("").optional(),
        handling_time:Joi.string().allow(null).allow("").optional(),
        avg_handling_time:Joi.string().allow(null).allow("").optional(),
        avg_disconnect_on_ivr_duration:Joi.string().allow(null).allow("").optional(),
        avg_disconnect_on_queue_duration:Joi.string().allow(null).allow("").optional(),
        avg_disconnect_on_agent_duration:Joi.string().allow(null).allow("").optional(),
        avg_disconnect_on_transfer_duration:Joi.string().allow(null).allow("").optional(),
        blankcall:Joi.number().allow(null).allow("").optional(),
        prankcall:Joi.number().allow(null).allow("").optional(),
        testcall:Joi.number().allow(null).allow("").optional(),
        wrongnumber:Joi.number().allow(null).allow("").optional(),
        inquiry:Joi.number().allow(null).allow("").optional(),
        request:Joi.number().allow(null).allow("").optional(),
        complaint:Joi.number().allow(null).allow("").optional(),
        followup:Joi.number().allow(null).allow("").optional(),
        request_time:Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("request_time must be a valid datetime format").allow(null).allow("").optional(),
        key_field:Joi.string().allow(null).allow("").optional(),
        followupvoicemail:Joi.number().allow(null).allow("").optional(),
        abandon_transfer_duration:Joi.string().allow(null).allow("").optional(),
        avg_abandon_transfer_duration:Joi.string().allow(null).allow("").optional(),
        abandon_agent_duration:Joi.string().allow(null).allow("").optional(),
        avg_abandon_agent_duration:Joi.string().allow(null).allow("").optional(),
        abandon_voicemail_duration:Joi.string().allow(null).allow("").optional(),
        avg_abandon_voicemail_duration:Joi.string().allow(null).allow("").optional(),
        abandon_ivr:Joi.number().allow(null).allow("").optional(),
        abandon_ivr_terminated:Joi.number().allow(null).allow("").optional(),
        abandon_ivr_early:Joi.number().allow(null).allow("").optional(),
        abandon_queue:Joi.number().allow(null).allow("").optional(),
        abandon_transfer:Joi.number().allow(null).allow("").optional(),
        abandon_agent:Joi.number().allow(null).allow("").optional(),
        inquiry_saldo:Joi.number().allow(null).allow("").optional(),
        inquiry_mutasi:Joi.number().allow(null).allow("").optional(),
        request_jak_one_mobile:Joi.number().allow(null).allow("").optional(),
        request_cms_va:Joi.number().allow(null).allow("").optional(),
        request_edc:Joi.number().allow(null).allow("").optional(),
        request_block_card:Joi.number().allow(null).allow("").optional(),
        complain_edc:Joi.number().allow(null).allow("").optional(),
        complain_jakcard:Joi.number().allow(null).allow("").optional(),
        complain_jakmobile:Joi.number().allow(null).allow("").optional(),
        complain_jakmobile_user:Joi.number().allow(null).allow("").optional(),
        complain_layanan:Joi.number().allow(null).allow("").optional(),
        complain_mesin_atm:Joi.number().allow(null).allow("").optional(),
        complain_pembayaran:Joi.number().allow(null).allow("").optional(),
        complain_transfer:Joi.number().allow(null).allow("").optional(),
        complain_tunai:Joi.number().allow(null).allow("").optional(),
    })
}

module.exports = schemas
