const dbQueryHelper = require('../helpers/db_query')
const table = 'calls'
const dateFormat = require('dateformat')


exports.getAll = async (conditions) => {
    const customConditions = []

    const customColumns = [
        `campaigns.name AS campaigns`,
        `customers.fullname AS customer_name`,
        `users.username AS pickup_by`,
        `outbound_statuses.name AS outbound_status`,
        `outbound_categories.name AS outbound_categories`,
        `outbound_category_details.name AS outbound_category_details`,
        `TIMEDIFF( hangup_date, answer_date )  AS call_duration`,
        `DATE(${table}.call_date) AS filedate`,
        `calls.pbx_filename AS filename`,

    ]
    const join = [
        `JOIN customers on customers.id = ${table}.customer_id`,
        `LEFT JOIN users ON users.id = ${table}.user_id`,
        `JOIN campaigns ON campaigns.id = ${table}.campaign_id`,
        `JOIN outbound_statuses ON outbound_statuses.id = ${table}.outbound_status_id`,
        `LEFT JOIN outbound_categories ON outbound_categories.id = ${table}.outbound_category_id`,
        `LEFT JOIN outbound_category_details ON outbound_category_details.id = ${table}.outbound_category_detail_id`,
    ]

    if (conditions.start !== undefined) {
        const start = dateFormat(conditions.start, 'yyyy-mm-dd')
        let end = start
        if (conditions.end !== undefined)
            end = dateFormat(conditions.end, 'yyyy-mm-dd')
        else
            end = dateFormat(conditions.start, 'yyyy-mm-dd')
        let custom = `DATE(${table}.call_date) BETWEEN "${start}" AND "${end}" `
        customConditions.push(custom)
    }
    if (conditions.customer_name !== undefined) {
        customConditions.push(`customers.fullname like '%${conditions.customer_name}%'`)
    }
    customConditions.push(`calls.outbound_status_id >=1`)

    const groupBy = ['calls.id']

    const data = await dbQueryHelper.getAll({ table, conditions, customConditions, join, groupBy ,customColumns })

    return data
};

exports.getDetail = async (conditions) => {
    const customColumns = [
        `outbound_statuses.name AS call_status`,
        `outbound_categories.name AS call_category`,
        `outbound_category_details.name AS call_category_detail`,
    ]
    const join = [
        `LEFT JOIN outbound_statuses ON outbound_statuses.id = ${table}.outbound_status_id`,
        `LEFT JOIN outbound_categories ON outbound_categories.id = ${table}.outbound_category_id`,
        `LEFT JOIN outbound_category_details ON outbound_category_details.id = ${table}.outbound_category_detail_id`,
    ]

    const data = await dbQueryHelper.getDetail({ table, conditions, join, customColumns })

    return data
}

exports.getRecording = async (conditions) => {
    const customConditions = []

    const columnSelect = ['id', 'phone_number']
    const customColumns = [
        `users.username AS agent_name`,
        `customers.fullname AS customer_name`,
        `DATE(${table}.call_date) AS filedate`,
        `pbx_filename AS filename`,

    ]
    const join = [
        `JOIN customers on customers.id = ${table}.customer_id`,
        `LEFT JOIN users ON users.id = ${table}.user_id`,
    ]

    if (conditions.start !== undefined) {
        const start = dateFormat(conditions.start, 'yyyy-mm-dd')
        let end = start
        if (conditions.end !== undefined)
            end = dateFormat(conditions.end, 'yyyy-mm-dd')
        else
            end = dateFormat(conditions.start, 'yyyy-mm-dd')
        let custom = `DATE(${table}.call_date) BETWEEN "${start}" AND "${end}" `
        customConditions.push(custom)
    }
    if (conditions.customer_name !== undefined) {
        customConditions.push(`customers.fullname like '%${conditions.customer_name}%'`)
    }
    customConditions.push(`pbx_filename is NOT NULL AND calls.outbound_status_id =1`)

    const data = await dbQueryHelper.getAll({ table, conditions, customConditions, columnSelect, join, customColumns })

    return data
}

exports.getQAlist = async (conditions) => {
    const customConditions = [`pickup_date IS NOT NULL`]
    const conditionTypes = { 'like': ['phone_number'] }

    if (conditions.customer_name !== undefined) {
        customConditions.push(`customers.fullname like '%${conditions.customer_name}%'`)
    }

    if (conditions.campaign_name !== undefined) {
        customConditions.push(`campaigns.name like '%${conditions.campaign_name}%'`)
    }

    if (conditions.agent !== undefined) {
        customConditions.push(`users.username like '%${conditions.agent}%'`)
    }

    if (conditions.start !== undefined) {
        const start = dateFormat(conditions.start, 'yyyy-mm-dd')
        let end = start
        if (conditions.end !== undefined)
            end = dateFormat(conditions.end, 'yyyy-mm-dd')
        else
            end = dateFormat(conditions.start, 'yyyy-mm-dd')
        let custom = `DATE(${table}.call_date) BETWEEN "${start}" AND "${end}"`
        customConditions.push(custom)
    }

    const customColumns = [
        '(SELECT qau.id FROM quality_assurance_users AS qau WHERE calls.id = qau.call_id LIMIT 1) AS quality_assurance_user_id',
        'customers.fullname AS customer_name',
        'campaigns.name AS campaign_name',
        'users.username AS agent',
        'DATE(call_date) AS filedate',
        'pbx_filename AS filename',
        'IFNULL(SEC_TO_TIME( SUM( TIMEDIFF( hangup_date, answer_date ) ) ),SEC_TO_TIME( SUM( TIMEDIFF( dropcall_date, answer_date ) ) )) AS call_duration',
        'outbound_categories.name AS outbound_categori',
	'outbound_category_details.name AS outbound_category_detail',
	'calls.note AS call_note'
    ]

    const columnSelect = [
        'id',
        'phone_number',        
        'call_date',
        'created_at',
        'customer_id',
        'campaign_id',
        'user_id',

    ]

    const join = [
        `LEFT JOIN customers ON customers.id = ${table}.customer_id`,
        `LEFT JOIN campaigns ON campaigns.id = ${table}.campaign_id`,
        `JOIN users ON users.id = ${table}.user_id`,
        `LEFT JOIN outbound_categories ON calls.outbound_category_id = outbound_categories.id`,
        `LEFT JOIN outbound_category_details ON calls.outbound_category_detail_id = outbound_category_details.id`

    ]
    const groupBy = ['calls.id']

    const data = await dbQueryHelper.getAll({ table, conditions, conditionTypes, customConditions, customColumns, columnSelect, join, groupBy })

    return data
}

exports.insertData = async (data) => {
    const protectedColumns = ['id']
    const cacheKeys = [table]
    const result = await dbQueryHelper.insertData({ table, data, protectedColumns, cacheKeys })

    return result
}

exports.updateData = async (data, conditions) => {
    const protectedColumns = ['id']
    const result = await dbQueryHelper.updateData({ table, data, conditions, protectedColumns })

    return result
}

exports.getReportCallActivity = async (conditions) => {
    const customConditions = []
    const columnSelect = ['user_id', 'username']

    const customColumns = [
        `users.username AS username,
        (
            SELECT
                user_events.event_date 
            FROM
                user_events 
            WHERE
                user_events.user_id = calls.user_id 
                AND DATE( user_events.event_date ) = DATE( calls.call_date ) 
                AND user_events.is_login = 1 
            ORDER BY
                user_events.id ASC 
                LIMIT 1 
            ) AS login_time,
            (
            SELECT
                user_events.event_date 
            FROM
                user_events 
            WHERE
                user_events.user_id = calls.user_id 
                AND DATE( user_events.event_date ) = DATE( calls.call_date ) 
                AND user_events.is_logout = 1 
            ORDER BY
                user_events.id DESC 
                LIMIT 1 
            ) AS logout_time,
            (SELECT user_escort.available_duration FROM user_escort WHERE user_escort.user_id = calls.user_id AND DATE(user_escort.activity_date) = DATE(calls.call_date) AND user_escort.available_duration IS NOT NULL ORDER by user_escort.id DESC limit 1 ) AS available_duration, 
            SEC_TO_TIME( SUM( TIMEDIFF( hangup_date, answer_date ) ) ) AS talk_time,
            (
            SELECT
                SEC_TO_TIME( SUM( TIMEDIFF( break_histories.break_end, break_histories.break_start ) ) ) 
            FROM
                break_histories 
            WHERE
                break_reason_id = 1 
                AND break_histories.user_id = calls.user_id 
                AND DATE(break_histories.break_start) = DATE( calls.call_date ) 
            ) AS rest_room,
            (
            SELECT
                SEC_TO_TIME( SUM( TIMEDIFF( break_histories.break_end, break_histories.break_start ) ) ) 
            FROM
                break_histories 
            WHERE
                break_reason_id = 2 
                AND break_histories.user_id = calls.user_id 
                AND DATE(break_histories.break_start) = DATE( calls.call_date ) 
            ) AS pray_time,
            (
            SELECT
                SEC_TO_TIME( SUM( TIMEDIFF( break_histories.break_end, break_histories.break_start ) ) ) 
            FROM
                break_histories 
            WHERE
                break_reason_id = 3 
                AND break_histories.user_id = calls.user_id 
                AND DATE(break_histories.break_start) = DATE( calls.call_date ) 
            ) AS coaching_time,
            (
            SELECT
                SEC_TO_TIME( SUM( TIMEDIFF( break_histories.break_end, break_histories.break_start ) ) ) 
            FROM
                break_histories 
            WHERE
                break_reason_id = 4 
                AND break_histories.user_id = calls.user_id 
                AND DATE(break_histories.break_start) = DATE( calls.call_date ) 
            ) AS break_time `
    ]

    if (conditions.start !== undefined) {
        const start = dateFormat(conditions.start, 'yyyy-mm-dd')
        let end = start
        if (conditions.end !== undefined)
            end = dateFormat(conditions.end, 'yyyy-mm-dd')
        else
            end = dateFormat(conditions.start, 'yyyy-mm-dd')
        let custom = `DATE(${table}.call_date) BETWEEN "${start}" AND "${end}" `
        customConditions.push(custom)
    } else if (conditions.date !== undefined) {
        customConditions.push(`DATE(${table}.call_date) = '${conditions.date}'`)
    } else {
        customConditions.push(`DATE(${table}.call_date) = CURRENT_DATE`)
    }

    if (conditions.limit !== undefined) {
        conditions.limit = conditions.limit
    } else {
        conditions.limit = 1000
    }

    const join = ['JOIN users ON users.id = calls.user_id ']

    const groupBy = ['user_id']

    const data = await dbQueryHelper.getAll({ table, conditions, customConditions, customColumns, columnSelect, join, groupBy })

    return data
}


exports.getReportPerformanceAgent = async (conditions) => {
    const customConditions = []
    const columnSelect = ['user_id']
    const customColumns = [
        `users.username AS agent,
        calls.campaign_id AS campaign_id,
        campaigns.name AS campaign_name,
        customers.fullname AS customer_name,
        customers.phone_1 AS phone_1,
        customers.phone_2 AS phone_2,
        customers.email AS email,
        customers.card_number AS card_number,
        customers.card_type AS card_type,
        customers.limits AS limits,
        customers.tenor AS tenor,
        customers.bank_name AS bank_name,
        customers.card_since_year AS card_since_year,
        customers.card_since_month AS card_since_month,
        customers.card_exp_date AS card_exp_date,
        customers.card_emboss_name AS card_emboss_name,
        ( customers.amount * 1) AS amount ,        
        customers.account_no AS account_no,
        customers.bank_interest AS bank_interest,
        customers.mother_name AS mother_name,
        customers.age AS age,
        customers.gender AS gender,
        customers.birth_place AS birth_place,
        customers.birth_date AS birth_date,
        customers.merchant AS merchant,
        customers.transaction_date AS transaction_date,
        customers.home_address AS home_address,
        customers.home_city AS home_city,
        customers.home_zip AS home_zip,
        customers.office_address AS office_address,
        customers.office_city AS office_city,
        customers.office_zip AS office_zip,
        customers.income AS income,
        customers.business_type AS business_type,
        customers.occupation AS occupation,
        customers.ktp AS ktp,
        customers.npwp AS npwp`
    ]

    if (conditions.start !== undefined) {
        const start = dateFormat(conditions.start, 'yyyy-mm-dd')
        let end = start
        if (conditions.end !== undefined)
            end = dateFormat(conditions.end, 'yyyy-mm-dd')
        else
            end = dateFormat(conditions.start, 'yyyy-mm-dd')
        let custom = `DATE(${table}.call_date) BETWEEN "${start}" AND "${end}" `
        customConditions.push(custom)
    } else if (conditions.date !== undefined) {
        customConditions.push(`DATE(${table}.call_date) = '${conditions.date}'`)
    } 
    const join = [
        `JOIN customers ON customers.id = ${table}.customer_id`,
        `JOIN users ON users.id = ${table}.user_id`,
        `JOIN campaigns ON campaigns.id = ${table}.campaign_id`,
    ]
    if (conditions.limit !== undefined) {
        conditions.limit = conditions.limit
    } else {
        conditions.limit = 1000
    }

    const data = await dbQueryHelper.getAll({ table, conditions, customConditions, customColumns, columnSelect, join })

    return data
}

exports.getReportCallCustomer = async (conditions) => {
    const customConditions = []
    const conditionTypes = { 'like': ['phone_number'] }
    const customColumns = [
        `calls.call_date AS calldate`,
        `us.username AS agent`,
        `us.fullname AS agent_fullname`,
        `campaigns.name AS campaign_name`,
        `customers.fullname AS customer_name`,
        `customer_statuses.name AS customer_status,
         checking_statuses.name AS checking_status,
         checking_reasons.name AS checking_reason`,
        `CASE            
            WHEN calls.phone_number = customers.phone_1 THEN
            'Phone Number 1' 
            WHEN calls.phone_number = customers.phone_2 THEN
            'Phone Number 2' ELSE 'unknown' 
        END AS phone_number_type`,
        `calls.phone_number AS phone_number`,
        `IF(calls.dropcall_date IS NOT NULL,TIMEDIFF( dropcall_date, answer_date ),TIMEDIFF( hangup_date, answer_date )) AS call_duration`,
        `calls.note AS notes`,
        `outbound_statuses.name AS outbound_status`,
        `outbound_categories.name AS outbound_category`,
        `outbound_category_details.name AS outbound_categoriy_detail`,
        `DATE(${table}.call_date) AS filedate`,
        `calls.pbx_filename AS filename`,
        `us.host_address AS host_address`,
        `file_uploads.original_filename AS upload_filename`
    ]

    customConditions.push(`${table}.outbound_status_id = 1`)
    if (conditions.start !== undefined) {
        const start = dateFormat(conditions.start, 'yyyy-mm-dd')
        let end = start
        if (conditions.end !== undefined)
            end = dateFormat(conditions.end, 'yyyy-mm-dd')
        else
            end = dateFormat(conditions.start, 'yyyy-mm-dd')
        let custom = `DATE(${table}.call_date) BETWEEN "${start}" AND "${end}" `
        customConditions.push(custom)
    } else if (conditions.date !== undefined) {
        customConditions.push(`DATE(${table}.call_date) = '${conditions.date}'`)
    }

    if (conditions.user_id !== undefined) {
        customConditions.push(`calls.user_id = ${conditions.user_id}`)
    }
    if (conditions.campaign_id !== undefined) {
        customConditions.push(`calls.campaign_id = ${conditions.campaign_id}`)
    }

    if (conditions.customer_name !== undefined) {
        customConditions.push(`customers.fullname like '%${conditions.customer_name}%'`)
    }
    customConditions.push(`file_uploads.file_type_id = 1`)

    const join = [
        `JOIN users us ON us.id = ${table}.user_id`,
        `JOIN customers ON customers.id = ${table}.customer_id`,
        `JOIN outbound_statuses ON outbound_statuses.id = ${table}.outbound_status_id`,
        `LEFT JOIN outbound_categories ON outbound_categories.id = ${table}.outbound_category_id`,
        `LEFT JOIN outbound_category_details ON outbound_category_details.id = ${table}.outbound_category_detail_id`,
        `JOIN campaigns ON campaigns.id = ${table}.campaign_id`,
        `JOIN file_uploads ON file_uploads.campaign_id = campaigns.id`,
        `LEFT JOIN customer_statuses ON customers.customer_status_id = customer_statuses.id
        LEFT JOIN checking_reasons ON customers.checking_reason_id = checking_reasons.id
        LEFT JOIN checking_statuses ON customers.checking_status_id = checking_statuses.id`
    ]
    if (conditions.limit !== undefined) {
        conditions.limit = conditions.limit
    } else {
        conditions.limit = 1000
    }

    const groupBy = ['calls.id']
    

    const data = await dbQueryHelper.getAll({ table, conditions, conditionTypes, customConditions, customColumns, join , groupBy})

    return data
};


exports.getBussinesssAchivement = async (conditions) => {
    const customConditions = []
    
    const columnSelect = ['id', 'user_id', 'campaign_id']
    const customColumns = [
        `( SELECT username FROM users WHERE user_id = users.id ) AS username`,       
        `COUNT( customers.amount ) AS number_customer_approved`,
        `SUM( customers.amount ) AS nominal`,
        `ROUND( AVG( customers.amount ), 0 ) AS average_customer_nominal_approved`,
    ]

    if(conditions.campaign_id){
        customColumns.push(`( SELECT campaigns.NAME FROM campaigns WHERE calls.campaign_id = campaigns.id ) AS campaign_name`)
    }else{
        customColumns.push(`( "ALL CAMPAIGNS" ) AS campaign_name`)
    }

    if (conditions.limit !== undefined) {
        conditions.limit = conditions.limit
    } else {
        conditions.limit = 1000
    }
 

    customConditions.push(`calls.outbound_category_id = 1 AND customers.amount IS NOT NULL `)

    const join = [
        `JOIN customers ON customers.id = ${table}.customer_id `,
    ]
    const groupBy = ['user_id']

    const data = await dbQueryHelper.getAll({ table, conditions, join, columnSelect, customColumns, customConditions, groupBy })

    return data
};

exports.getCallCost = async (conditions) => {
    const customConditions = []
    const columnSelect = ['id']
    const customColumns = [
        `users.username AS name`,
        `COUNT( calls.id ) AS number_of_call`,
        `SEC_TO_TIME( SUM( TIME_TO_SEC( TIMEDIFF( hangup_date, answer_date ) ) ) ) AS  durasi`,
        `ROUND(12.5* SUM( TIME_TO_SEC( TIMEDIFF( hangup_date, answer_date ) ) ),0)  AS predictive_call_cost`,
    ]

    if (conditions.start !== undefined) {
        const start = dateFormat(conditions.start, 'yyyy-mm-dd')
        let end = start
        if (conditions.end !== undefined)
            end = dateFormat(conditions.end, 'yyyy-mm-dd')
        else
            end = dateFormat(conditions.start, 'yyyy-mm-dd')
        let custom = `DATE(${table}.call_date) BETWEEN "${start}" AND "${end}" `
        customConditions.push(custom)
    } else if (conditions.date !== undefined) {
        customConditions.push(`DATE(${table}.call_date) = '${conditions.date}'`)
    } else {
        customConditions.push(`DATE(${table}.call_date) = CURRENT_DATE`)
    }

    if (conditions.limit !== undefined) {
        conditions.limit = conditions.limit
    } else {
        conditions.limit = 1000
    }


    const join = [
        `JOIN users ON users.id = ${table}.user_id `,
    ]
    const groupBy = ['user_id']

    const data = await dbQueryHelper.getAll({ table, conditions, join, columnSelect, customColumns, customConditions, groupBy })

    return data
};

exports.getReportChecker = async (conditions) => {
    const customConditions = []

    const customColumns = [
        `calls.call_date AS calldate`,
        `us.username AS agent`,
        `us.fullname AS agent_fullname`,
        `campaigns.name AS campaign_name`,
        `customers.fullname AS customer_name`,
        `CASE            
            WHEN calls.phone_number = customers.phone_1 THEN
            'Phone Number 1' 
            WHEN calls.phone_number = customers.phone_2 THEN
            'Phone Number 2' ELSE 'unknown' 
        END AS phone_number_type`,
        `calls.phone_number AS phone_number`,
        `IF(calls.dropcall_date IS NOT NULL,TIMEDIFF( dropcall_date, answer_date ),TIMEDIFF( hangup_date, answer_date )) AS call_duration`,
        `calls.note AS notes`,
        `outbound_statuses.name AS outbound_status`,
        `outbound_categories.name AS outbound_category`,
        `outbound_category_details.name AS outbound_categoriy_detail`,
        `ser.username AS checking_by`,
        `checking_reasons.name AS checking_reason`,
        `customers.checking_note AS checking_note`,
        `calls.pbx_filename AS filename`,
        `us.host_address AS host_address`
    ]

    if (conditions.start !== undefined) {
        const start = dateFormat(conditions.start, 'yyyy-mm-dd')
        let end = start
        if (conditions.end !== undefined)
            end = dateFormat(conditions.end, 'yyyy-mm-dd')
        else
            end = dateFormat(conditions.start, 'yyyy-mm-dd')
        let custom = `DATE(${table}.call_date) BETWEEN "${start}" AND "${end}" `
        customConditions.push(custom)
    } else if (conditions.date !== undefined) {
        customConditions.push(`DATE(${table}.call_date) = '${conditions.date}'`)
    } 

    if (conditions.user_id !== undefined) {
        customConditions.push(`calls.user_id = ${conditions.user_id}`)
    }
    if (conditions.campaign_id !== undefined) {
        customConditions.push(`calls.campaign_id = ${conditions.campaign_id}`)
    }
    if (conditions.checker_user_id !== undefined) {
        customConditions.push(`customers.checker_user_id = ${conditions.checker_user_id}`)
    }
    if (conditions.checking_reason_id !== undefined) {
        customConditions.push(`customers.checking_reason_id = ${conditions.checking_reason_id}`)
    }
    const join = [
        `JOIN users us ON us.id = ${table}.user_id`,
        `JOIN customers ON customers.id = ${table}.customer_id`,
        `LEFT JOIN users ser ON ser.id = customers.checker_user_id`,
        `JOIN outbound_statuses ON outbound_statuses.id = ${table}.outbound_status_id`,
        `JOIN outbound_categories ON outbound_categories.id = ${table}.outbound_category_id`,
        `LEFT JOIN outbound_category_details ON outbound_category_details.id = ${table}.outbound_category_detail_id`,
        `JOIN campaigns ON campaigns.id = ${table}.campaign_id`,
        `JOIN checking_reasons ON customers.checking_reason_id = checking_reasons.id`,
    ]
    if (conditions.limit !== undefined) {
        conditions.limit = conditions.limit
    } else {
        conditions.limit = 1000
    }

    const groupBy = ['customer_id']

    const data = await dbQueryHelper.getAll({ table, conditions, customConditions, customColumns, join, groupBy })

    return data
};


exports.getReportCallDetail = async (conditions) => {
    const customConditions = []
    const conditionTypes = { 'like': ['phone_number'] }
    const customColumns = [
        `calls.call_date AS calldate`,
        `us.username AS agent`,
        `us.fullname AS agent_fullname`,
        `campaigns.name AS campaign_name`,
        `customers.fullname AS customer_name`,
        `CASE            
            WHEN calls.phone_number = customers.phone_1 THEN
            'Phone Number 1' 
            WHEN calls.phone_number = customers.phone_2 THEN
            'Phone Number 2' ELSE 'unknown' 
        END AS phone_number_type`,
        `calls.phone_number AS phone_number`,
        `IF(calls.dropcall_date IS NOT NULL,TIMEDIFF( dropcall_date, answer_date ),TIMEDIFF( hangup_date, answer_date )) AS call_duration`,
        `calls.note AS notes`,
        `outbound_statuses.name AS outbound_status`,
        `outbound_categories.name AS outbound_category`,
        `outbound_category_details.name AS outbound_categoriy_detail`,
        `DATE(${table}.call_date) AS filedate`,
        `calls.pbx_filename AS filename`,
        `us.host_address AS host_address`,
        `file_uploads.original_filename AS upload_filename`
    ]

    if (conditions.start !== undefined) {
        const start = dateFormat(conditions.start, 'yyyy-mm-dd')
        let end = start
        if (conditions.end !== undefined)
            end = dateFormat(conditions.end, 'yyyy-mm-dd')
        else
            end = dateFormat(conditions.start, 'yyyy-mm-dd')
        let custom = `DATE(${table}.call_date) BETWEEN "${start}" AND "${end}" `
        customConditions.push(custom)
    } else if (conditions.date !== undefined) {
        customConditions.push(`DATE(${table}.call_date) = '${conditions.date}'`)
    }

    if (conditions.user_id !== undefined) {
        customConditions.push(`calls.user_id = ${conditions.user_id}`)
    }
    if (conditions.campaign_id !== undefined) {
        customConditions.push(`calls.campaign_id = ${conditions.campaign_id}`)
    }

    if (conditions.customer_name !== undefined) {
        customConditions.push(`customers.fullname like '%${conditions.customer_name}%'`)
    }
    customConditions.push(`file_uploads.file_type_id = 1`)
    const join = [
        `LEFT JOIN users us ON us.id = ${table}.user_id`,
        `JOIN customers ON customers.id = ${table}.customer_id`,
        `JOIN outbound_statuses ON outbound_statuses.id = ${table}.outbound_status_id`,
        `LEFT JOIN outbound_categories ON outbound_categories.id = ${table}.outbound_category_id`,
        `LEFT JOIN outbound_category_details ON outbound_category_details.id = ${table}.outbound_category_detail_id`,
        `JOIN campaigns ON campaigns.id = ${table}.campaign_id`,
        `JOIN file_uploads ON file_uploads.campaign_id = campaigns.id`,
    ]
    if (conditions.limit !== undefined) {
        conditions.limit = conditions.limit
    } else {
        conditions.limit = 1000
    }

    const groupBy = ['calls.id']

    const data = await dbQueryHelper.getAll({ table, conditions, conditionTypes, customConditions, customColumns, join, groupBy })

    return data
};




