const dbQueryHelper = require('../helpers/db_query')
const table = 'checking_statuses'

exports.getAll = async (conditions) => {
    let conditionTypes =  {'like': ['name']}
   

    const data = await dbQueryHelper.getAll({ table, conditionTypes, conditions})

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
