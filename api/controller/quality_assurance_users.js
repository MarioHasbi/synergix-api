const dbQueryHelper = require('../helpers/db_query')
const table = 'quality_assurance_users'

exports.getAll = async (conditions) => {
    const customConditions =[]
    
    if(conditions.customer_name !== undefined) {
        customConditions.push(`customers.fullname like '%${conditions.customer_name}%'`)
    }
    if(conditions.campaign_id !== undefined) {
        customConditions.push(`calls.campaign_id = '${conditions.campaign_id}'`)
    }
    if(conditions.phone_number !== undefined) {
        customConditions.push(`calls.phone_number like '%${conditions.phone_number}%'`)
    }
    if(conditions.agent !== undefined) {
        customConditions.push(`calls.user_id = '${conditions.agent}'`)
    }

    if (conditions.start !== undefined) {
        customConditions.push(`quality_assurance_date BETWEEN '${conditions.start}'`)
        if (conditions.end !== undefined) {
            customConditions.push( ` '${conditions.end}'`)
        }
        else
        { 
            customConditions.push( ` '${conditions.start}'`) 
        }
    }
    

    const customColumns = [
        '( SELECT users.username FROM users WHERE users.id = quality_assurance_users.observer_id ) AS observer_name',
        'quality_assurance.name AS quality_assurance_name',
        'calls.call_date AS call_date',
        'calls.campaign_id AS campaign_id',
        `(SELECT campaigns.name FROM campaigns
             WHERE campaigns.id = calls.campaign_id) AS campaign_name`,
        'calls.customer_id AS customer_id',
        `customers.fullname AS customer_name`,
        'calls.user_id AS call_user_id',
        `(SELECT users.username FROM users
             WHERE users.id = calls.user_id) AS agent`,
        'calls.call_duration AS call_duration',
        'calls.phone_number AS phone_number'
    ]

    const join = [
        'LEFT JOIN quality_assurance ON quality_assurance.id = quality_assurance_users.quality_assurance_id',
        'LEFT JOIN calls ON calls.id = quality_assurance_users.call_id',
        'LEFT JOIN customers ON customers.id = calls.customer_id',
    ]

    const data = await dbQueryHelper.getAll({ table, conditions,customConditions, customColumns, join })

    return data
};

exports.getDetail = async (conditions) => {

    const customColumns = [
        'quality_assurance.name AS quality_assurance_name',
        'users.username AS agent',
        'calls.phone_number AS phone_number',
        'calls.call_date AS call_date',
        'calls.call_duration AS call_duration',
        'customers.fullname AS customer_name',
        'observers.username AS observer_name',
        'periods.name AS period_name'

    ]

    const join = [
        `LEFT JOIN quality_assurance ON quality_assurance.id = ${table}.quality_assurance_id`,
        `LEFT JOIN users ON users.id = ${table}.user_id`,
        `LEFT JOIN calls ON calls.id = ${table}.call_id`,
        `LEFT JOIN users AS observers ON observers.id = ${table}.observer_id`,
        'LEFT JOIN customers ON customers.id = calls.customer_id',
        `LEFT JOIN periods ON periods.id = ${table}.period_id`
    ]

    const data = await dbQueryHelper.getDetail({ table, conditions, customColumns, join })

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
