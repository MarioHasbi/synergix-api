const express = require('express');
const responses = require('../helpers/response')
const muteController = require('../controller/mute')
const router = express.Router()


router.post('/', async (req, res) => {
    const dataParam = {
        channel: req.body.channel,
        direction: req.body.direction,
        state: req.body.state
    }

    const muteResponse = await muteController.mute(dataParam)
    let data = {

        total_data: 1,
        data: muteResponse
    }

    return responses.sendSuccessData(res, data)

})


module.exports = router
