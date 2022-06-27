const dbQueryHelper = require('../helpers/db_query')
const table = 'product_types'

exports.getAll = async (conditions) => {
    let conditionTypes = {}
    conditionTypes = {
        'like': ['name']
        //  ,'date': ['created', 'updated'] 
    }
    // const customColumns = [
    //     `product_types.id as id`,
    //     `product_types.sort as sort`,
    //     `product_types.code as code`,
    //     `products.name as product`,
    //     `product_types.name as product_type`,
    //     `product_types.info as info`,
    //     `product_types.is_default as is_default`,
    //     `product_types.is_active as is_active`
    // ]
    // const join = [
    //     `LEFT JOIN products ON ${table}.product_id = products.id`,
    // ]

    const data = await dbQueryHelper.getAll({ table, conditionTypes, conditions})

    return data
};

exports.getDetail = async (conditions) => {
    // const customColumns = [
    //     `product_types.id as id`,
    //     `product_types.sort as sort`,
    //     `product_types.code as code`,
    //     `products.name as product`,
    //     `product_types.name as product_type`,
    //     `product_types.info as info`,
    //     `product_types.is_default as is_default`,
    //     `product_types.is_active as is_active`
    // ]
    // const join = [
    //     `LEFT JOIN products ON ${table}.product_id = products.id`,
    // ]
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
