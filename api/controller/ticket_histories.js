const dbQueryHelper = require('../helpers/db_query')
const table = 'ticket_histories'

exports.getAll = async (conditions) => {
    let conditionTypes = {}
    conditionTypes = {
        'like': ['note'],
        'date': ['created']
    }

    const data = await dbQueryHelper.getAll({table, conditionTypes, conditions})
    
    return data
};

exports.getDetail = async (conditions) => {
    const customColumns = [
        `tickets.ticket_no AS ticket_no`,
        `ticket_statuses.name AS ticket_status`,
        `users.username AS users_username`,
        `users.fullname AS users_fullname`,
    ]
    const join = [
        `LEFT JOIN tickets ON tickets.id = ${table}.ticket_id`,
        `LEFT JOIN ticket_statuses ON ticket_statuses.id = ${table}.ticket_status_id`,
        `LEFT JOIN users ON users.id = ${table}.user_id`
    ]

    const data = await dbQueryHelper.getDetail({table, conditions, join, customColumns})
    
    return data
}

exports.insertData = async (data) => {
    const protectedColumns = ['id']
    const result = await dbQueryHelper.insertData({table, data, protectedColumns})
    
    return result
}
