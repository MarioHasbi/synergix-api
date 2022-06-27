const _ = require('lodash')
const amiUrl = require('../config').ami.baseUrl
const dbQueryHelper = require('../helpers/db_query')
const fetch = require('node-fetch')
const table = 'users'

exports.updateMember = async (data, conditions) => {
    const dataToUpdate = {
        user_activity_id: data.user_activity_id
    }
    const dataCondition = {
        id: data.user_id
    }
    const result = await dbQueryHelper.updateData({table, data: dataToUpdate, conditions: dataCondition})

    const id = conditions.id
    const dataAmi = {
        extension: data.extension,
        action: data.action
    }    
    const amiService = await fetch(`${amiUrl}/queues/${id}/members`, {
		method: 'PUT',
		headers: {
            'Content-Type': 'application/json',
			'User-Agent': `Synergix API`
		},
		body: JSON.stringify(dataAmi)
	}).then(response => response.json())

    return result
}

exports.updateStatusMember = async (data, conditions) => {
    const dataToUpdate = {
        user_activity_id: data.user_activity_id
    }
    const dataCondition = {
        id: data.user_id
    }
    const result = await dbQueryHelper.updateData({table, data: dataToUpdate, conditions: dataCondition})
    
    const id = conditions.id
    const dataAmi = {
        extension: data.extension,
        is_paused: data.action
    }
    const amiService = await fetch(`${amiUrl}/queues/${id}/member_statuses`, {
		method: 'PUT',
		headers: {
            'Content-Type': 'application/json',
			'User-Agent': `Synergix API`
		},
		body: JSON.stringify(dataAmi)
	}).then(response => response.json())
    
    return result
}
