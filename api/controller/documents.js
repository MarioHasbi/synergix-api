const dbQueryHelper = require('../helpers/db_query')
const table = 'documents'

exports.getAll = async (conditions) => {
    let conditionTypes = {}
    conditionTypes = {
        'like': ['path', 'path_transfer', 'filename', 'mime_type', 'info'],
        'date': ['created', 'updated']
    }
    const customColumns = [
        `user_creator.username AS user_creator_username`,
        `user_creator.fullname AS user_creator_fullname`,
        `user_updater.username AS user_updater_username`,
        `user_updater.fullname AS user_updater_fullname`,
        `department_creator.name AS department_creator_name`,
        `department_updater.name AS department_updater_name`
    ]
    const join = [
        `LEFT JOIN users user_creator ON user_creator.id = ${table}.create_user_id`,
        `LEFT JOIN users user_updater ON user_updater.id = ${table}.update_user_id`,
        `LEFT JOIN departments department_creator ON department_creator.id = user_creator.department_id`,
        `LEFT JOIN departments department_updater ON department_updater.id = user_updater.department_id`,
    ]

    const data = await dbQueryHelper.getAll({table, conditionTypes, conditions, join, customColumns})
    
    return data
};

exports.getDetail = async (conditions) => {
    const customColumns = [
        `user_creator.username AS user_creator_username`,
        `user_creator.fullname AS user_creator_fullname`,
        `user_updater.username AS user_updater_username`,
        `user_updater.fullname AS user_updater_fullname`,
        `department_creator.name AS department_creator_name`,
        `department_updater.name AS department_updater_name`
    ]
    const join = [
        `LEFT JOIN users user_creator ON user_creator.id = ${table}.create_user_id`,
        `LEFT JOIN users user_updater ON user_updater.id = ${table}.update_user_id`,
        `LEFT JOIN departments department_creator ON department_creator.id = user_creator.department_id`,
        `LEFT JOIN departments department_updater ON department_updater.id = user_updater.department_id`,
    ]

    const data = await dbQueryHelper.getDetail({table, conditions, join, customColumns})
    
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
    const protectedColumns = ['id', 'filename', 'path', 'file_size', 'mime_type']
    const result = await dbQueryHelper.updateData({table, data, conditions, protectedColumns})
    
    return result
}
