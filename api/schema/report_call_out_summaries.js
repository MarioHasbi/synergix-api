const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()
    }),
    create: Joi.object().keys({
        direction:Joi.string().allow(null).allow("").optional(),
        call_date:Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("call_date must be a valid datetime format").allow(null).allow("").optional(),
        created:Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("created must be a valid datetime format").allow(null).allow("").optional(),
        updated:Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("updated must be a valid datetime format").allow(null).allow("").optional(),
        call_hour:Joi.string().allow(null).allow("").optional(),
        total_call:Joi.number().allow(null).allow("").optional(),
        connected:Joi.number().allow(null).allow("").optional(),
        unconnected:Joi.number().allow(null).allow("").optional(),
        talk_duration:Joi.string().allow(null).allow("").optional(),
        avg_talk_duration:Joi.string().allow(null).allow("").optional(),
        contact:Joi.number().allow(null).allow("").optional(),
        uncontacted:Joi.number().allow(null).allow("").optional(),
        invalidno:Joi.number().allow(null).allow("").optional(),
        faxline:Joi.number().allow(null).allow("").optional(),
        outofcoverage:Joi.number().allow(null).allow("").optional(),
        notactive:Joi.number().allow(null).allow("").optional(),
        temporary_disconnected:Joi.number().allow(null).allow("").optional(),
        noanswer:Joi.number().allow(null).allow("").optional(),
        bussyline:Joi.number().allow(null).allow("").optional(),
        notone:Joi.number().allow(null).allow("").optional(),
        unregistered:Joi.number().allow(null).allow("").optional(),
        atwork:Joi.number().allow(null).allow("").optional(),
        busy:Joi.number().allow(null).allow("").optional(),
        deceased:Joi.number().allow(null).allow("").optional(),
        disconnected:Joi.number().allow(null).allow("").optional(),
        leavemessage:Joi.number().allow(null).allow("").optional(),
        moved:Joi.number().allow(null).allow("").optional(),
        notathome:Joi.number().allow(null).allow("").optional(),
        notavailable:Joi.number().allow(null).allow("").optional(),
        online:Joi.number().allow(null).allow("").optional(),
        others:Joi.number().allow(null).allow("").optional(),
        unknown:Joi.number().allow(null).allow("").optional(),
        wrongno:Joi.number().allow(null).allow("").optional(),
        metting:Joi.number().allow(null).allow("").optional(),
        testcall:Joi.number().allow(null).allow("").optional(),
        follow_up_ticket:Joi.number().allow(null).allow("").optional(),
        follow_up_voicemail:Joi.number().allow(null).allow("").optional(),
        confirmation:Joi.number().allow(null).allow("").optional(),
        survey:Joi.number().allow(null).allow("").optional(),
    }),
    update: Joi.object().keys({ 
        direction:Joi.string().allow(null).allow("").optional(),
        call_date:Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("call_date must be a valid datetime format").allow(null).allow("").optional(),
        created:Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("created must be a valid datetime format").allow(null).allow("").optional(),
        updated:Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("updated must be a valid datetime format").allow(null).allow("").optional(),
        call_hour:Joi.string().allow(null).allow("").optional(),
        total_call:Joi.number().allow(null).allow("").optional(),
        connected:Joi.number().allow(null).allow("").optional(),
        unconnected:Joi.number().allow(null).allow("").optional(),
        talk_duration:Joi.string().allow(null).allow("").optional(),
        avg_talk_duration:Joi.string().allow(null).allow("").optional(),
        contact:Joi.number().allow(null).allow("").optional(),
        uncontacted:Joi.number().allow(null).allow("").optional(),
        invalidno:Joi.number().allow(null).allow("").optional(),
        faxline:Joi.number().allow(null).allow("").optional(),
        outofcoverage:Joi.number().allow(null).allow("").optional(),
        notactive:Joi.number().allow(null).allow("").optional(),
        temporary_disconnected:Joi.number().allow(null).allow("").optional(),
        noanswer:Joi.number().allow(null).allow("").optional(),
        bussyline:Joi.number().allow(null).allow("").optional(),
        notone:Joi.number().allow(null).allow("").optional(),
        unregistered:Joi.number().allow(null).allow("").optional(),
        atwork:Joi.number().allow(null).allow("").optional(),
        busy:Joi.number().allow(null).allow("").optional(),
        deceased:Joi.number().allow(null).allow("").optional(),
        disconnected:Joi.number().allow(null).allow("").optional(),
        leavemessage:Joi.number().allow(null).allow("").optional(),
        moved:Joi.number().allow(null).allow("").optional(),
        notathome:Joi.number().allow(null).allow("").optional(),
        notavailable:Joi.number().allow(null).allow("").optional(),
        online:Joi.number().allow(null).allow("").optional(),
        others:Joi.number().allow(null).allow("").optional(),
        unknown:Joi.number().allow(null).allow("").optional(),
        wrongno:Joi.number().allow(null).allow("").optional(),
        metting:Joi.number().allow(null).allow("").optional(),
        testcall:Joi.number().allow(null).allow("").optional(),
        follow_up_ticket:Joi.number().allow(null).allow("").optional(),
        follow_up_voicemail:Joi.number().allow(null).allow("").optional(),
        confirmation:Joi.number().allow(null).allow("").optional(),
        survey:Joi.number().allow(null).allow("").optional(),
    })
}

module.exports = schemas
