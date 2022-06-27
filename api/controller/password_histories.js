const dbQueryHelper = require('../helpers/db_query')
const table = 'password_histories'

exports.getAll = async (conditions) => {
    let conditionTypes = {}
    conditionTypes = {
      /*  'like': ['path', 'path_transfer', 'filename', 'mime_type', 'info'],
        'date': ['created', 'updated'] */
    }
    // const customColumns = [
    //     `media_replies.id AS id`,
    //     `medias.name AS media`,
    //     `media_replies.media_record_id AS media_record_id`,
    //     `media_replies.media_record_reply_id AS media_record_reply_id`,
    //     `media_statuses.name AS media_status`,
    //     `media_status_details.name AS media_status_detail`
    // ]
    // const join = [
    //     `LEFT JOIN media_statuses ON ${table}.media_status_reply_id = media_statuses.id`,
    //     `LEFT JOIN media_status_details ON ${table}.media_status_reply_detail_id = media_status_details.id`,
    //     `LEFT JOIN medias ON ${table}.media_id = medias.id`,
    // ]

    const data = await dbQueryHelper.getAll({table, conditionTypes, conditions})
    
    return data
};

exports.getDetail = async (conditions) => {
    // const customColumns = [
    //     `media_replies.id AS id`,
    //     `medias.name AS media`,
    //     `media_replies.media_record_id AS media_record_id`,
    //     `media_replies.media_record_reply_id AS media_record_reply_id`,
    //     `media_statuses.name AS media_status`,
    //     `media_status_details.name AS media_status_detail`
    // ]
    // const join = [
    //     `LEFT JOIN media_statuses ON ${table}.media_status_reply_id = media_statuses.id`,
    //     `LEFT JOIN media_status_details ON ${table}.media_status_reply_detail_id = media_status_details.id`,
    //     `LEFT JOIN medias ON ${table}.media_id = medias.id`,
    // ]

    const data = await dbQueryHelper.getDetail({table, conditions})
    
    return data
}

exports.insertData = async (data) => {
  const protectedColumns = ['id']
    const cacheKeys = [table]
    const result = await dbQueryHelper.insertData({table, data, protectedColumns, cacheKeys})
    
    return result
}

exports.insertManyData = async (data) => {
    const protectedColumns = ['id']
    const cacheKeys = [table]
    const result = await dbQueryHelper.insertManyData({table, data, protectedColumns, cacheKeys})
    
    return result
}

exports.updateData = async (data, conditions) => {
    // const protectedColumns = ['id', 'media_id', 'media_record_id', 'media_record_reply_id', 'media_status_reply_id','media_status_reply_detail_id']
    const result = await dbQueryHelper.updateData({table, data, conditions})
    
    return result
}
