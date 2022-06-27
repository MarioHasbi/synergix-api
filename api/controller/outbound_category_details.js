const dbQueryHelper = require('../helpers/db_query')
const table = 'outbound_category_details'

exports.getAll = async (conditions) => {
    const conditionTypes = {
        'like': ['name']
    }

    const customColumns = [
        `outbound_categories.name AS outbound_category`
    ]

    const join = [
        `LEFT JOIN outbound_categories ON outbound_categories.id = ${table}.outbound_category_id`
    ]

    const data = await dbQueryHelper.getAll({ table, conditions, conditionTypes, customColumns, join })
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

exports.updateData = async (data, conditions) => {
    const protectedColumns = ['id']
    const result = await dbQueryHelper.updateData({ table, data, conditions, protectedColumns })

    return result
}
