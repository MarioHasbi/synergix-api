const express = require('express');
const responses = require('../helpers/response')
const dtmfControler = require('../controller/dtmf')
const router = express.Router()


router.post('/', async (req, res) => {
    const dataParam = {
        channel: req.body.channel,
        digit: req.body.digit
        
    }

    const dtmfResponse = await dtmfControler.dtmf(dataParam)
    let data = {

        total_data: 1,
        data: dtmfResponse
    }

    return responses.sendSuccessData(res, data)

})


module.exports = router
