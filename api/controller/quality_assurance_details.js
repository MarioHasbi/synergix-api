const dbQueryHelper = require('../helpers/db_query')
const table = 'quality_assurance_details'
const dateFormat = require('dateformat')

exports.getAll = async (conditions) => {
    const customColumns = [
        'quality_assurance_aspects.aspect_name AS quality_assurance_aspect_name'
    ]

    const join = [
        `LEFT JOIN quality_assurance_aspects ON quality_assurance_aspects.id = ${table}.quality_assurance_aspect_id`
    ]

    const data = await dbQueryHelper.getAll({ table, conditions, customColumns, join })

    return data
};


exports.getQADetails = async (conditions) => {
    const customConditions = []
    const columnSelect = ['id']
    const customColumns = [
        `quality_assurance.NAME AS qa_name`,
        `quality_assurance_aspects.aspect_name as aspect_callmon`,
        `quality_assurance_aspects.bobot AS bobot`,
        `IF(quality_assurance_details.result > 0 ,'YES','NO') AS hasil`,
        `quality_assurance_details.result AS skor`,
        `calls.call_date AS calldate`,
        `TIMEDIFF(hangup_date,answer_date) AS durasi`,
        `customers.fullname AS customer_fullname`,
        `customers.card_number AS card_number`,
        `u.username AS QA_by`,
        `user.username AS agent`,
        `quality_assurance_users.notes AS qa_notes`,
        `periods.name AS period_name`,
        `quality_assurance_user_id qau`,
        `(SELECT SUM(quality_assurance_details.result) FROM quality_assurance_details WHERE quality_assurance_user_id = qau ) as total`


    ]

    const join = [
        `JOIN quality_assurance_users ON ${table}.quality_assurance_user_id = quality_assurance_users.id`,
        `JOIN calls ON quality_assurance_users.call_id = calls.id`,
        `JOIN quality_assurance_aspects ON quality_assurance_details.quality_assurance_aspect_id = quality_assurance_aspects.id`,
        `JOIN quality_assurance ON quality_assurance_aspects.quality_assurance_id = quality_assurance.id`,
        `JOIN customers ON calls.customer_id = customers.id`,
        `JOIN users u ON quality_assurance_users.observer_id = u.id`,
        `JOIN users user ON calls.user_id = user.id `,
        `JOIN periods ON periods.id = quality_assurance_users.period_id`
    ]

    const data = await dbQueryHelper.getAll({ table, conditions, customConditions, customColumns, columnSelect, join })

    return data
}


exports.getQASummaries = async (conditions) => {
    const customConditions = []
    const columnSelect = ['id']
    const customColumns = [
        `users.username AS username`,
        `SUM( CASE WHEN quality_assurance_users.period_id = 1 THEN quality_assurance_details.result ELSE 0 END ) 
        AS period_1`,
        `SUM( CASE WHEN quality_assurance_users.period_id = 2 THEN quality_assurance_details.result ELSE 0 END ) 
        AS period_2`,
        `SUM( CASE WHEN quality_assurance_users.period_id = 3 THEN quality_assurance_details.result ELSE 0 END ) 
        AS period_3`,
        `SUM( CASE WHEN quality_assurance_users.period_id = 4 THEN quality_assurance_details.result ELSE 0 END ) 
        AS period_4`,
        `SUM( CASE WHEN quality_assurance_users.period_id = 5 THEN quality_assurance_details.result ELSE 0 END ) 
        AS period_5`,
        `SUM( CASE WHEN quality_assurance_users.period_id = 6 THEN quality_assurance_details.result ELSE 0 END ) 
        AS period_6`,
        `SUM( CASE WHEN quality_assurance_users.period_id = 7 THEN quality_assurance_details.result ELSE 0 END ) 
        AS period_7`,
        `SUM( CASE WHEN quality_assurance_users.period_id = 8 THEN quality_assurance_details.result ELSE 0 END ) 
        AS period_8`,
        `SUM( CASE WHEN quality_assurance_users.period_id = 9 THEN quality_assurance_details.result ELSE 0 END ) 
        AS period_9`,
        `SUM( CASE WHEN quality_assurance_users.period_id = 10 THEN quality_assurance_details.result ELSE 0 END ) 
        AS period_10 `
    ]

    if (conditions.date !== undefined) {
        customConditions.push(`DATE(quality_assurance_users.quality_assurance_date) LIKE '${conditions.date}%'`)
    }
    if (conditions.agent !== undefined) {
        customConditions.push(`users.username = '${conditions.agent}'`)
    }
    if (conditions.user_id !== undefined) {
        customConditions.push(`users.id = '${conditions.user_id}'`)
    }

    const join = [
        `JOIN quality_assurance_users ON ${table}.quality_assurance_user_id = quality_assurance_users.id`,
        `JOIN calls ON quality_assurance_users.call_id = calls.id`,
        `JOIN users ON calls.user_id = users.id `,
        `JOIN periods ON periods.id = quality_assurance_users.period_id`,
    ]
    const groupBy = ['calls.user_id']

    const data = await dbQueryHelper.getAll({ table, conditions, customConditions, customColumns, columnSelect, join, groupBy })

    return data
}

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
