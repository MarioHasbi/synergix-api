const dbQueryHelper = require('../helpers/db_query')
const table = 'callback_reasons'

exports.getAll = async (conditions) => {
    let conditionTypes = {}

    conditionTypes = {
        'like': ['name']
    }
    


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
    // const protectedColumns = ['id', 'media_id', 'media_record_id', 'media_record_reply_id', 'media_status_reply_id','media_status_reply_detail_id']
    const result = await dbQueryHelper.updateData({ table, data, conditions })

    return result
}
