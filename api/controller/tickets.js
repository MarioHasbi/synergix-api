const _ = require('lodash')
const dateFormat = require('dateformat')
const dbQueryHelper = require('../helpers/db_query')
const table = 'tickets'

exports.getAll = async (conditions) => {
    let customConditions = []

    if (conditions.alias_id !== undefined) {
        customConditions.push(`id = ${conditions.alias_id}`)
    }

    if (conditions.start !== undefined && _.toNumber(conditions.start) > 0) {
        const start = dateFormat(conditions.start * 1000, 'yyyy-mm-dd')
        let end = start

        if (conditions.end !== undefined && _.toNumber(conditions.end) > 0) {
            end = dateFormat(conditions.end * 1000, 'yyyy-mm-dd')
        }
        
        let custom = `DATE(${table}.open_date) BETWEEN "${start}" AND "${end}"`
        customConditions.push(custom)
    }

    let conditionTypes = {}
    conditionTypes = {
        'like': ['customer_name', 'customer_email', 'customer_phone', 'customer_account_no', 'customer_card_no'],
        'date': ['media_date', 'open_date', 'process_date', 'assign_back_date', 'resolve_date', 'close_date', 'cancel_date'] // client should pass timetamp data
    }
    const data = await dbQueryHelper.getAll({table, customConditions, conditionTypes, conditions})
    
    return data
};

exports.getDetail = async (conditions) => {
    const columnDeselect = []
    const customColumns = []
    const join = []
    const data = await dbQueryHelper.getDetail({table, conditions, columnDeselect, join, customColumns})
    
    return data
}

exports.insertData = async (data) => {
    const protectedColumns = ['id']
    const result = await dbQueryHelper.insertData({table, data, protectedColumns })
    
    return result
}

exports.updateData = async (data, conditions) => {
    const protectedColumns = ['id']
    const result = await dbQueryHelper.updateData({table, data, conditions, protectedColumns})
    
    return result
}
