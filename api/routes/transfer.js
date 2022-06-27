const express = require('express');
const responses = require('../helpers/response')
const transferController = require('../controller/transfer')
const router = express.Router()


router.post('/', async (req, res) => {
    
        const dataParam = {
            channel: req.body.channel,
            destination : req.body.destination,
            phone_number : req.body.phone_number,
            username : req.body.username
        }

        const transferResponse = await transferController.transfer(dataParam)
    let data = {

        total_data: 1,
        data: transferResponse
    }

    return responses.sendSuccessData(res, data)

})


module.exports = router

