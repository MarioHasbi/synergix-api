const dbQueryHelper = require('../helpers/db_query')
const table = 'emails'
const dateFormat = require('dateformat')

exports.getAll = async (conditions) => {
    const customConditions = []
    const customColumns = [
        'customers.fullname AS customer_name',
        'email_statuses.name AS email_status',
        `file_uploads.original_filename AS filename`,
        `customers.is_active AS customer_active`
    ]
    const join = [
        `JOIN customers ON customers.id = ${table}.customer_id`,
        `JOIN email_statuses ON email_statuses.id = ${table}.email_status_id`,
        `JOIN file_uploads ON file_uploads.id = customers.file_upload_id`,
    ]

    if (conditions.date !== undefined) {
        customConditions.push(`DATE(${table}.created_at) = "${conditions.date}"`)
    }
    customConditions.push(`file_uploads.file_type_id = 1`)

if(conditions.filename !== undefined)
{
    customConditions.push(`file_uploads.original_filename LIKE '%${conditions.filename}%'`)
}

    if (conditions.start_date !== undefined) {
        const start = dateFormat(conditions.start_date, 'yyyy-mm-dd')
        let end = start
        if (conditions.end_date !== undefined)
            end = dateFormat(conditions.end_date, 'yyyy-mm-dd')
        else
            end = dateFormat(conditions.start_date, 'yyyy-mm-dd')
        let custom = `DATE(${table}.created_at) BETWEEN "${start}" AND "${end}"`
        customConditions.push(custom)
    }

    if (conditions.customer_name !== undefined) {
        customConditions.push(`customers.fullname LIKE '%${conditions.customer_name}%'`)
    }
    if (conditions.customer_active !== undefined) {
        customConditions.push(`customers.is_active = ${conditions.customer_active}`)
    }
    const data = await dbQueryHelper.getAll({ table, conditions, customConditions, customColumns, join })
    return data
};

exports.getReportEmails = async (conditions) => {
    const customConditions = []
    const customColumns = [
        `mail_date AS sent_date`,
        `email_statuses.name AS email_status`,
        `campaigns.name AS campaign_name`,
        `subject AS subject`,
        `content AS content`,
        `email_to AS receptients`,
        `file_uploads.original_filename AS filename`
    ]
    const join = [
        `JOIN email_statuses ON ${table}.email_status_id = email_statuses.id`,
        `JOIN campaigns ON ${table}.campaign_id = campaigns.id`,
        `JOIN file_uploads ON file_uploads.campaign_id = campaigns.id`,
    ]

    if (conditions.date !== undefined) {
        customConditions.push(`DATE(${table}.created_at) = "${conditions.date}"`)
    }

    if (conditions.start !== undefined) {
        const start = dateFormat(conditions.start, 'yyyy-mm-dd')
        let end = start
        if (conditions.end !== undefined)
            end = dateFormat(conditions.end, 'yyyy-mm-dd')
        else
            end = dateFormat(conditions.start, 'yyyy-mm-dd')
        let custom = `DATE(${table}.created_at) BETWEEN "${start}" AND "${end}"`
        customConditions.push(custom)
    }
    if (conditions.filename !== undefined) {
        customConditions.push(`file_uploads.original_filename like '%${conditions.filename}%'`)
    }
    if(conditions.limit !== undefined)
    { 
        conditions.limit = conditions.limit
    }else{
        conditions.limit = 1000
    }
    customConditions.push(`file_uploads.file_type_id = 1`)

    
    const data = await dbQueryHelper.getAll({ table, conditions, customConditions, customColumns, join })
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

exports.updateData = async (data, conditions) => {
    const protectedColumns = ['id']
    const result = await dbQueryHelper.updateData({ table, data, conditions, protectedColumns })

    return result
}
