const dbQueryHelper = require('../helpers/db_query')
const table = 'file_uploads'
const dateFormat = require('dateformat')
const downloadHelper = require('../helpers/download')
const path = require('path') 
const config = require('../config/')
const fs = require('fs')

exports.getAll = async (conditions) => {
    const customConditions = []
    const customColumns = [
        `users.username AS upload_by`,
    ]

    const join = [
        `LEFT JOIN users ON users.id = ${table}.created_by`,
    ]

    if (conditions.start !== undefined) {
        const start = dateFormat(conditions.start, 'yyyy-mm-dd')
        let end = start
        if (conditions.end !== undefined)
            end = dateFormat(conditions.end, 'yyyy-mm-dd')
        else
            end = dateFormat(conditions.start, 'yyyy-mm-dd')
        let custom = `DATE(${table}.created_at) BETWEEN "${start}" AND "${end}" `
        customConditions.push(custom)
    }
    const data = await dbQueryHelper.getAll({ table, conditions, customConditions, customColumns, join })
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


exports.downloadInfo = async (campaign_id, fileName) => {
    let result = {
        url: null,
        filename: null,
        status: false
    }

    console.log(campaign_id, fileName)

    if (!fileName) {
        return result
    }

    let campaignID = campaign_id.toString()

    const localFolder = path.join(config.infoAttachmentDir,campaignID)  
    const localFilename = path.join(localFolder, fileName) 



    const isFileExist = await downloadHelper.isFileExist(localFilename)

    if (isFileExist) { 
        result = {
            url: `/download_info/${campaignID}/${fileName}`,
            filename: fileName,
            status: true
        }
    } else {

        if (!fs.existsSync(localFolder)){
            fs.mkdirSync(localFolder, { recursive: true });
        }
        
        const download_result = await downloadHelper.downloadFile(`${config.infoAttachmentDir}/${campaignID}/${fileName}`, localFolder)
        if (download_result.status !== false) { 

            result = {
                url: `/download_info/${campaignID}/${fileName}`,
                filename: fileName,
                status: true
            }
        } else {
            result = {
                error: download_result.error,
                status: false
            }
        }
    }


    return result

}