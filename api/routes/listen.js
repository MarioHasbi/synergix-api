const express = require('express');
const responses = require('../helpers/response')
const listenController = require('../controller/listen')

const router = express.Router()


router.post('/', async (req, res) => {

    const dataParam = {
        source: req.cookies.ext,
        destination: req.body.destination
    }
    if (dataParam.source !== undefined && dataParam.destination !== undefined) {
        const listenResponse = await listenController.listen(dataParam)
        let data = {

            total_data: 1,
            data: listenResponse
        }

        return responses.sendSuccessData(res, data)
    }
    else {
        return response.sendBadRequest(res, 'Invalid Data')
    }
})

router.post('/unlisten', async (req, res, next) => {
    const result = await listenController.unlisten(req.body)

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

