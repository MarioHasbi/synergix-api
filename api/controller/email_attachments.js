const dbQueryHelper = require('../helpers/db_query')
const encryption = require('../helpers/encryption')
const table = 'email_attachments'

exports.getAll = async (conditions) => {
    const baseURL = conditions.base_url
    const data = await dbQueryHelper.getAll({table, conditions})

    if (data.total_data > 0) {
		let i = 0
        
		data.data.map(row => {
            const attachmentData = {
                id: row.id,
                path: row.path,
                file_name: row.file_name,
                file_size: row.file_size,
                mime_type: row.mime_type,
                link: ''
            }
            const attachmentInfo = JSON.stringify(attachmentData)

            try {
                const encryptedString = encryption.encrypt(attachmentInfo)
                data['data'][i]['link'] = `${baseURL}/files/${encryptedString}`
            } catch(e) {
                return {
                    total_data: 0,
                    data: false
                }
            }

            i++
		})
	}

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

exports.updateData = async (data, conditions) => {
    const protectedColumns = ['id']
    const result = await dbQueryHelper.updateData({ table, data, conditions, protectedColumns })

    return result
}

exports.insertManyData = async (data) => {
    const protectedColumns = ['id']
    const cacheKeys = [table, 'emails']
    const result = await dbQueryHelper.insertManyData({table, data, protectedColumns, cacheKeys})
    
    return result
}
