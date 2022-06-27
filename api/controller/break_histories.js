const dbQueryHelper = require('../helpers/db_query')
const table = 'break_histories'
const dateFormat = require('dateformat')

exports.getAll = async (conditions) => { 
    const data = await dbQueryHelper.getAll({ table, conditions}) 
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

exports.getReportBreak = async (conditions) => {
    const customConditions = []
    const customColumns = [
        `break_histories.id AS recordid`,
        `DATE(break_histories.break_start) AS break_date`,
        `TIME(break_histories.break_start) AS break_time`,
        `users.username AS username`,
        `break_reasons.name AS break_reason`,
        `DATE(break_histories.break_end) AS resume_date`,
        `TIME(break_histories.break_end) AS resume_time`,
        `timediff(break_end,break_start) AS duration`,
        `break_histories.total_break AS total_break`
    ]
    const join = [
        `JOIN break_reasons ON ${table}.break_reason_id = break_reasons.id`,
        `JOIN users ON ${table}.user_id = users.id`,
    ]

    if (conditions.date !== undefined) {
        customConditions.push(`DATE(${table}.break_start) = "${conditions.date}"`)
    }

    else if (conditions.start !== undefined) {
        const start = dateFormat(conditions.start, 'yyyy-mm-dd')
        let end = start
        if (conditions.end !== undefined)
            end = dateFormat(conditions.end, 'yyyy-mm-dd')
        else
            end = dateFormat(conditions.start, 'yyyy-mm-dd')
        let custom = `DATE(${table}.break_start) BETWEEN "${start}" AND "${end}"`
        customConditions.push(custom)
    }
    
    if(conditions.limit !== undefined)
    { 
        conditions.limit = conditions.limit
    }else{
        conditions.limit = 1000
    }    
    const data = await dbQueryHelper.getAll({ table, conditions, customConditions, customColumns, join })
    return data
};
