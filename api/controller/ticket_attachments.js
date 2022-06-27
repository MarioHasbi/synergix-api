const dbQueryHelper = require('../helpers/db_query')
const table = 'ticket_attachments'

exports.getAll = async (conditions) => {
    let conditionTypes = {}
    conditionTypes = {
        'like': ['path', 'path_transfer', 'filename', 'file_info', 'mime_type'],
        'date': ['created']
    }

    const data = await dbQueryHelper.getAll({table, conditionTypes, conditions})
    
    return data
};

exports.getDetail = async (conditions) => {
    const customColumns = [
        `users.username AS user_username`,
        `users.fullname AS user_fullname`,
        `departments.name AS department_name`
    ]
    const join = [
        `LEFT JOIN users ON users.id = ${table}.user_id`,
        `LEFT JOIN departments ON departments.id = users.department_id`
    ]

    const data = await dbQueryHelper.getDetail({table, conditions, join, customColumns})
    
    return data
}

exports.insertData = async (data) => {
    const protectedColumns = ['id']
    const result = await dbQueryHelper.insertData({table, data, protectedColumns})
    
    return result
}

exports.insertManyData = async (data) => {
    const protectedColumns = ['id']
    const result = await dbQueryHelper.insertManyData({table, data, protectedColumns})
    
    return result
}

exports.updateData = async (data, conditions) => {
    const protectedColumns = ['id', 'path', 'filename', 'file_size', 'mime_type']
    const result = await dbQueryHelper.updateData({table, data, conditions, protectedColumns})
    
    return result
}
