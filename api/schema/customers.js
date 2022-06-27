const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().min(1).required()

    }),
    create: Joi.object().keys({
        // insert here
        campaign_id: Joi.number().allow(null).allow("").optional(),
        import_id: Joi.number().allow(null).allow("").optional(),
        file_upload_id: Joi.number().allow(null).allow("").optional(),
        fullname: Joi.string().allow(null).allow("").optional(),
        bank_name: Joi.string().allow(null).allow("").optional(),
        account_no: Joi.number().allow(null).allow("").optional(),
        card_number: Joi.string().allow(null).allow("").optional(),
        phone_1: Joi.string().allow(null).allow("").optional(),
        phone_2: Joi.string().allow(null).allow("").optional(),
        phone_to_call: Joi.number().allow(null).allow("").optional(),
        email: Joi.string().allow(null).allow("").optional(),
        home_address: Joi.string().allow(null).allow("").optional(),
        card_type: Joi.string().allow(null).allow("").optional(),
        amount: Joi.string().allow(null).allow("").optional(),
        limits: Joi.string().allow(null).allow("").optional(),
        tenor: Joi.string().allow(null).allow("").optional(),
        bank_interest: Joi.string().allow(null).allow("").optional(),
        age: Joi.number().allow(null).allow("").optional(),
        merchant: Joi.string().allow(null).allow("").optional(),
        transaction_date: Joi.string().allow(null).allow("").optional(),
        office_address: Joi.string().allow(null).allow("").optional(),
        mother_name: Joi.string().allow(null).allow("").optional(),
        home_city: Joi.string().allow(null).allow("").optional(),
        home_zip: Joi.string().allow(null).allow("").optional(),
        card_emboss_name: Joi.string().allow(null).allow("").optional(),
        gender: Joi.string().allow(null).allow("").optional(),
        birth_place: Joi.string().allow(null).allow("").optional(),
        birth_date: Joi.string().allow(null).allow("").optional(),
        application_card_emboss_name: Joi.string().allow(null).allow("").optional(),
        income: Joi.string().allow(null).allow("").optional(),
        business_type: Joi.string().allow(null).allow("").optional(),
        occupation: Joi.string().allow(null).allow("").optional(),
        ktp: Joi.string().allow(null).allow("").optional(),
        npwp: Joi.string().allow(null).allow("").optional(),
        office_city: Joi.string().allow(null).allow("").optional(),
        office_zip: Joi.string().allow(null).allow("").optional(),
        card_since_year: Joi.string().allow(null).allow("").optional(),
        card_since_month: Joi.string().allow(null).allow("").optional(),
        card_exp_date: Joi.string().allow(null).allow("").optional(),
        customer_status_id: Joi.number().allow(null).allow("").optional(),
        outbound_status_id: Joi.number().allow(null).allow("").optional(),
        outbound_category_id: Joi.number().allow(null).allow("").optional(),
        outbound_category_detail_id: Joi.number().allow(null).allow("").optional(),
        is_req_callfile: Joi.number().allow(null).allow("").optional(),
        close_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("close_date must be a valid datetime format").allow(null).allow("").optional(),
        last_call_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("last_call_date must be a valid datetime format").allow(null).allow("").optional(),
        next_call_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("next_call_date must be a valid datetime format").allow(null).allow("").optional(),
        total_call_attempt: Joi.number().allow(null).allow("").optional(),
        total_call_day_attempt: Joi.number().allow(null).allow("").optional(),
        call_attempt_per_day: Joi.number().allow(null).allow("").optional(),
        campaign_detail_id: Joi.number().allow(null).allow("").optional(),
        checking_status_id: Joi.number().allow(null).allow("").optional(),
        checking_reason_id: Joi.number().allow(null).allow("").optional(),
        checker_user_id: Joi.number().allow(null).allow("").optional(),
        is_active: Joi.number().allow(null).allow("").optional(),
        created_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("created_at must be a valid datetime format").allow(null).allow("").optional(),
        created_by: Joi.number().allow(null).allow("").optional(),
        updated_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("updated_at must be a valid datetime format").allow(null).allow("").optional(),
        updated_by: Joi.number().allow(null).allow("").optional()
    }),
    update: Joi.object().keys({
        // insert here
        campaign_id: Joi.number().allow(null).allow("").optional(),
        import_id: Joi.number().allow(null).allow("").optional(),
        file_upload_id: Joi.number().allow(null).allow("").optional(),
        fullname: Joi.string().allow(null).allow("").optional(),
        bank_name: Joi.string().allow(null).allow("").optional(),
        account_no: Joi.number().allow(null).allow("").optional(),
        card_number: Joi.string().allow(null).allow("").optional(),
        phone_1: Joi.string().allow(null).allow("").optional(),
        phone_2: Joi.string().allow(null).allow("").optional(),
        phone_to_call: Joi.number().allow(null).allow("").optional(),
        email: Joi.string().allow(null).allow("").optional(),
        home_address: Joi.string().allow(null).allow("").optional(),
        card_type: Joi.string().allow(null).allow("").optional(),
        amount: Joi.string().allow(null).allow("").optional(),
        limits: Joi.string().allow(null).allow("").optional(),
        tenor: Joi.string().allow(null).allow("").optional(),
        bank_interest: Joi.string().allow(null).allow("").optional(),
        age: Joi.number().allow(null).allow("").optional(),
        merchant: Joi.string().allow(null).allow("").optional(),
        transaction_date: Joi.string().allow(null).allow("").optional(),
        office_address: Joi.string().allow(null).allow("").optional(),
        mother_name: Joi.string().allow(null).allow("").optional(),
        home_city: Joi.string().allow(null).allow("").optional(),
        home_zip: Joi.string().allow(null).allow("").optional(),
        card_emboss_name: Joi.string().allow(null).allow("").optional(),
        gender: Joi.string().allow(null).allow("").optional(),
        birth_place: Joi.string().allow(null).allow("").optional(),
        birth_date: Joi.string().allow(null).allow("").optional(),
        application_card_emboss_name: Joi.string().allow(null).allow("").optional(),
        income: Joi.string().allow(null).allow("").optional(),
        business_type: Joi.string().allow(null).allow("").optional(),
        occupation: Joi.string().allow(null).allow("").optional(),
        ktp: Joi.string().allow(null).allow("").optional(),
        npwp: Joi.string().allow(null).allow("").optional(),
        office_city: Joi.string().allow(null).allow("").optional(),
        office_zip: Joi.string().allow(null).allow("").optional(),
        card_since_year: Joi.string().allow(null).allow("").optional(),
        card_since_month: Joi.string().allow(null).allow("").optional(),
        card_exp_date: Joi.string().allow(null).allow("").optional(),
        customer_status_id: Joi.number().allow(null).allow("").optional(),
        outbound_status_id: Joi.number().allow(null).allow("").optional(),
        outbound_category_id: Joi.number().allow(null).allow("").optional(),
        outbound_category_detail_id: Joi.number().allow(null).allow("").optional(),
        is_req_callfile: Joi.number().allow(null).allow("").optional(),
        close_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("close_date must be a valid datetime format").allow(null).allow("").optional(),
        last_call_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("last_call_date must be a valid datetime format").allow(null).allow("").optional(),
        next_call_date: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("next_call_date must be a valid datetime format").allow(null).allow("").optional(),
        total_call_attempt: Joi.number().allow(null).allow("").optional(),
        total_call_day_attempt: Joi.number().allow(null).allow("").optional(),
        call_attempt_per_day: Joi.number().allow(null).allow("").optional(),
        campaign_detail_id: Joi.number().allow(null).allow("").optional(),
        checking_status_id: Joi.number().allow(null).allow("").optional(),
        checking_reason_id: Joi.number().allow(null).allow("").optional(),
        checker_user_id: Joi.number().allow(null).allow("").optional(),
        is_active: Joi.number().allow(null).allow("").optional(),
        created_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("created_at must be a valid datetime format").allow(null).allow("").optional(),
        created_by: Joi.number().allow(null).allow("").optional(),
        updated_at: Joi.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/).message("updated_at must be a valid datetime format").allow(null).allow("").optional(),
        updated_by: Joi.number().allow(null).allow("").optional()
    }),
}

module.exports = schemas