const _ = require('lodash')
const config = require('../config/index')
const fs = require('fs')
const multer = require('multer')

exports.public = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = config.publicDir
        cb(null, path)
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop()
        const randomNum = _.random(1000, 5000)
        cb(null, file.fieldname + '-' + randomNum + '-' + Date.now() + '.' + ext)
    }
})

exports.userPhoto = multer.memoryStorage({
    destination: function (req, file, cb) {
        const path = config.userPhotoDir
        fs.mkdirSync(path, { recursive: true })
        cb(null, path)
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop()
        const randomNum = _.random(1000, 5000)
        cb(null, file.fieldname + '-' + randomNum + '-' + Date.now() + '.' + ext)
    }
})

exports.ticketAttachment = (folder = '') => {
    let directory = config.ticketAttachmentDir

    if (folder !== '' || folder !== undefined) {
        directory = `${config.ticketAttachmentDir}/${folder}`
    }

    const directoryUpload = _.replace(directory, '//', '/')

    return multer.diskStorage({
        destination: function (req, file, cb) {
            const path = directoryUpload
            fs.mkdirSync(path, { recursive: true })
            cb(null, path)
        },

        // By default, multer removes file extensions so let's add them back
        filename: function (req, file, cb) {
            let fileName = file.originalname.split('.').slice(0, -1).join('.')
            let cutFileName = fileName.substring(0, 200)
            let splitFileName = _.split(cutFileName, ' ')
            let finalName = _.join(splitFileName, '_')
            let ext = file.originalname.split('.').pop()
            cb(null, finalName + '-' + Date.now() + '.' + ext)
        }
    })
}

// exports.infoAttachment = multer.diskStorage({
//     destination: function(req, file, cb) {
//         const path = config.infoAttachmentDir
//         fs.mkdirSync(path, { recursive: true })
//         cb(null, path)
//     },
exports.infoAttachment = (folder = '') => {
    let directory = config.infoAttachmentDir

    if (folder !== '' || folder !== undefined) {
        directory = `${config.infoAttachmentDir}/${folder}`
    }

    const directoryUpload = _.replace(directory, '//', '/')

    return multer.diskStorage({
        destination: function (req, file, cb) {
            const path = directoryUpload
            fs.mkdirSync(path, { recursive: true })
            cb(null, path)
        },

        // By default, multer removes file extensions so let's add them back
        filename: function (req, file, cb) {
            let fileName = file.originalname.split('.').slice(0, -1).join('.')
            let cutFileName = fileName.substring(0, 200)
            let splitFileName = _.split(cutFileName, ' ')
            let finalName = _.join(splitFileName, '_')
            let ext = file.originalname.split('.').pop()
            cb(null, finalName + '-' + Date.now() + '.' + ext)
        }
    })
}

exports.emailOutboxAttachment = (folder = '') => {
    let directory = config.emailOutboxAttachmentDir

    if (folder !== '' || folder !== undefined) {
        directory = `${config.emailOutboxAttachmentDir}/${folder}`
    }

    const directoryUpload = _.replace(directory, '//', '/')

    return multer.diskStorage({
        destination: function (req, file, cb) {
            const path = directoryUpload
            fs.mkdirSync(path, { recursive: true })
            cb(null, path)
        },

        // By default, multer removes file extensions so let's add them back
        filename: function (req, file, cb) {
            let fileName = file.originalname.split('.').slice(0, -1).join('.')
            let cutFileName = fileName.substring(0, 200)
            let splitFileName = _.split(cutFileName, ' ')
            let finalName = _.join(splitFileName, '_')
            let ext = file.originalname.split('.').pop()
            cb(null, finalName + '-' + Date.now() + '.' + ext)
        }
    })
}
