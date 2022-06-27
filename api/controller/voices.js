const config = require('../config/')
const fs = require('fs')
const path = require('path') 
const downloadHelper = require('../helpers/download')

exports.playVoice = async (conditions) => {
    let result = {
        url: null,
        filename: null,
        status: false
    }

    let fileDate = conditions.filedate;
    let fileName = conditions.filename;

    if (!fileDate) {
        return result
    }

    if (!fileName) {
        return result
    }

    // replace character '-' with '/'
    fileDate = fileDate.replace(/-/g, "/")

    const parseDate = fileDate.split("/")
    const year = parseDate[0]    
    const month = parseDate[1]
    const day = parseDate[2]

    const localFolder = path.join(config.folderNameVoice, year, month, day)  
    const localFilename = path.join(localFolder, fileName) 

    const isFileExist = await downloadHelper.isFileExist(localFilename)

    if (isFileExist) { 
        result = {
            url: `/download_voice/${year}/${month}/${day}/${fileName}`,
            filename: fileName,
            status: true
        }
    } else {

        if (!fs.existsSync(localFolder)){
            fs.mkdirSync(localFolder, { recursive: true });
        }
        
        const download_result = await downloadHelper.downloadFile(`${config.voiceServer}${fileDate}/${fileName}`, localFolder)
        if (download_result.status !== false) { 

            result = {
                url: `/download_voice/${year}/${month}/${day}/${fileName}`,
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