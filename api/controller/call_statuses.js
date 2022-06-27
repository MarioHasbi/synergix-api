const dbQueryHelper = require('../helpers/db_query')
const table = 'call_statuses'

exports.getAll = async (conditions) => {
    let conditionTypes = {}
    conditionTypes = {
        'like': [],
        'date': []
    }
    const columnSelect = []
    const customColumns = []
    const join = []

    const data = await dbQueryHelper.getAll({ table, conditionTypes, conditions, join, columnSelect, customColumns })

    return data
};

exports.getDetail = async (conditions) => {
    const customColumns = []
    const join = []

    const data = await dbQueryHelper.getDetail({ table, conditions, join, customColumns })

    return data
}
