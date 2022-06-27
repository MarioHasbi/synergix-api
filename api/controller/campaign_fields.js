const dbQueryHelper = require('../helpers/db_query')
const table = 'campaign_fields'

exports.getAll = async (conditions) => {
    let conditionTypes = {}
    const customConditions = []

    if (conditions.campaign_name !== undefined) {
        customConditions.push(`campaigns.name like '%${conditions.campaign_name}%'`)
    }

    if (conditions.customer_field_display_name !== undefined) {
        customConditions.push(`customer_fields.field_display_name like '%${conditions.customer_field_display_name}%'`)
    }

    const customColumns = [
        'campaigns.name AS campaign_name',
        'customer_fields.field_display_name AS customer_field_display_name'
    ]

    const join = [
        `LEFT JOIN campaigns ON campaigns.id = ${table}.campaign_id`,
        `LEFT JOIN customer_fields ON customer_fields.id = ${table}.customer_field_id`
    ]

    const data = await dbQueryHelper.getAll({ table, conditions, conditionTypes, customConditions, customColumns, join })

    return data
}


exports.getFields = async (conditions) => {
    
    customColumns = [
        'customer_fields.id as customer_field_id',
        'customer_fields.field_name as field_name',
        'customer_fields.field_display_name as field_display_name']

    join = ['JOIN customer_fields ON campaign_fields.customer_field_id = customer_fields.id',]

    const data = await dbQueryHelper.getAll({ table, customColumns, join, conditions })

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
    const protectedColumns = ['id']
    const result = await dbQueryHelper.updateData({ table, data, conditions, protectedColumns })

    return result
}

exports.insertUpdateData = async (data) => {
    const cacheKeys = [table]
    const result = await dbQueryHelper.insertDuplicateUpdateData({ table, data, cacheKeys })
    
    return result
}