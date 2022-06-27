const express = require('express')

const controller = require('../controller/file_uploads')
const response = require('../helpers/response')
const router = express.Router()





router.get('/', async (req, res, next) => {
    const conditions = req.query
    const result = await controller.getAll(conditions)
    if (result.data === false) {
        return response.sendDataNotFound(res, result)
    }

    return response.sendSuccessData(res, result)
})

router.get('/download/:id', async (req, res, next) => {
    const conditions = { id: req.params.id }

    const getData = await controller.getDetail(conditions)
    let campaign_id
    let fileName

    if (getData.data !== false) {
        campaign_id = getData.data.campaign_id
        fileName = getData.data.uploaded_filename
    }


    const file_info = await controller.downloadInfo(campaign_id,fileName)
    if (file_info.status === false) {
        return response.sendBadRequest(res, 'Invalid Data')
    }
    const result = {
        data: {
            url: "http://" + req.headers.host + file_info.url,
            filename: file_info.filename
        }
    }
    return response.sendSuccessData(res, result)
})



router.get('/:id', async (req, res, next) => {
    const conditions = { id: req.params.id }
    const result = await controller.getDetail(conditions)

    if (result.data === false) {
        return response.sendDataNotFound(res, result)
    }

    return response.sendSuccessData(res, result)
})

router.post('/', async (req, res, next) => {
    const result = await controller.insertData(req.body)

    if (result.data === false) {
        return response.sendBadRequest(res, 'Invalid Data')
    }

    return response.sendCreated(res, result)
})

router.put('/:id', async (req, res, next) => {
    const conditions = { id: req.params.id }
    const result = await controller.updateData(req.body, conditions)
    if (result.data === false) {
        return response.sendDataNotFound(res, result)
    }

    return response.sendSuccessData(res, result)
})




router.all(['/', '//:id'], (req, res, next) => {
    response.sendMethodNotAllowed(res)
})

module.exports = router