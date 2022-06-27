const dbQueryHelper = require('../helpers/db_query')
const table = 'campaign_users'

exports.getAll = async (conditions) => {
    const conditionTypes = {
        'like':['phone_number']
    }
    const customConditions = []

    if (conditions.campaign_name !== undefined) {
        customConditions.push(`campaigns.name like '%${conditions.campaign_name}%'`)
    }

    if (conditions.agent !== undefined) {
        customConditions.push(`users.userame like '%${conditions.agent}%'`)
    }

    const customColumns = [
        'campaigns.name AS campaign_name',
        'users.username AS agent'
    ]

    const join = [
        `LEFT JOIN campaigns ON campaigns.id = ${table}.campaign_id`,
        `LEFT JOIN users ON users.id = ${table}.user_id`
    ]

    const data = await dbQueryHelper.getAll({ table, conditionTypes, conditions, customConditions, customColumns, join })

    return data
}

exports.getUsers = async (conditions) => {
    const customConditions = []
    if (conditions.username !== undefined) {

        customConditions.push(`username = '${conditions.username}'`)
    }
    if (conditions.campaign_users_is_active !== undefined) {

        customConditions.push(`campaign_users.is_active = '${conditions.campaign_users_is_active}'`)
    }
    const customColumns = [
        `users.username AS username`

    ]
    const join = [`JOIN users ON users.id = ${table}.user_id`,]


    console.log(conditions)
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
