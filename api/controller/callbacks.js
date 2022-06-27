const dbQueryHelper = require('../helpers/db_query')
const table = 'callbacks'
const dateFormat = require('dateformat')

exports.getAll = async (conditions) => {
    let conditionTypes = {}

    let customConditions =[]

    conditionTypes = {
        'like': ['name']
    }
    const customColumns = [
        `callbacks.callback_time AS scheduled_at`,
        `campaigns.name AS campaign_name`,
        `customers.fullname AS customer_name`,
        `users.username AS agent`,
        `callbacks.phone_no AS phone_number`,
        `callback_reasons.name AS reason`,
        `IF
	( is_called = 1, "YES", "NO" ) AS called,
	outbound_statuses.name AS outbound_status `
    ]

    const join = [
        `JOIN campaigns ON campaigns.id = ${table}.campaign_id`,
        `JOIN customers ON customers.id = ${table}.customer_id`,
        `JOIN users ON users.id = ${table}.user_id`,
        `JOIN callback_reasons ON callback_reasons.id = ${table}.callback_reason_id`,
        `LEFT JOIN calls ON calls.id = ${table}.call_id`,
        `LEFT JOIN outbound_statuses ON outbound_statuses.id = calls.outbound_status_id`
    ]

    if (conditions.start !== undefined) {
        const start = dateFormat(conditions.start, 'yyyy-mm-dd')
        let end = start
        if (conditions.end !== undefined)
            end = dateFormat(conditions.end, 'yyyy-mm-dd')
        else
            end = dateFormat(conditions.start, 'yyyy-mm-dd')
        let custom = `DATE(${table}.callback_time) BETWEEN "${start}" AND "${end}" `
        customConditions.push(custom)
    }
    if(conditions.customer_name!== undefined){
        customConditions.push(`customers.fullname LIKE '%${conditions.customer_name}%'`)
    }
    if(conditions.campaign_name!== undefined){
        customConditions.push(`campaigns.name LIKE '%${conditions.campaign_name}%'`)
    }


    const data = await dbQueryHelper.getAll({ table, conditionTypes, customConditions, conditions, customColumns, join })

    return data
};

exports.getDetail = async (conditions) => {

    const data = await dbQueryHelper.getDetail({ table, conditions })

    return data
}

exports.insertData = async (data) => {
    const protectedColumns = ['id']
    const cacheKeys = [table]
    const result = await dbQueryHelper.insertData({ table, data, protectedColumns, cacheKeys })

    return result
}

exports.insertManyData = async (data) => {
    const protectedColumns = ['id']
    const cacheKeys = [table]
    const result = await dbQueryHelper.insertManyData({ table, data, protectedColumns, cacheKeys })

    return result
}

exports.updateData = async (data, conditions) => {
    // const protectedColumns = ['id', 'media_id', 'media_record_id', 'media_record_reply_id', 'media_status_reply_id','media_status_reply_detail_id']
    const result = await dbQueryHelper.updateData({ table, data, conditions })

    return result
}
