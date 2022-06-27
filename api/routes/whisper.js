const express = require('express');
const responses = require('../helpers/response')
const whisperController = require('../controller/whisper')
const router = express.Router()


router.post('/', async (req, res) => {

    const dataParam = {
        source: req.cookies.ext,
        destination: req.body.destination
    }

    if (dataParam.source !== undefined && dataParam.destination !== undefined) {
        const whisperResponse = await whisperController.whisper(dataParam)
        let data = {
            total_data: 1,
            data: whisperResponse
        }
        return responses.sendSuccessData(res, data)
    }
    else{
        return responses.sendBadRequest(res, 'Invalid Data')
    }
})


router.post('/unwhisper', async (req, res, next) => {
    const result = await whisperController.unwhisper(req.body)

    if (result.data === false) {
        return responses.sendBadRequest(res, 'Invalid Data')
    }
    let data = {
        total_data: 1,
        data: result
    }

    return responses.sendSuccessData(res, data)
})


module.exports = router

