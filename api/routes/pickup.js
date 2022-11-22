const express = require('express');
const responses = require('../helpers/response')
const pickupController = require('../controller/pickup')
const userController = require('../controller/users')
const callsController = require('../controller/calls')
const dateFormat = require('dateformat')
const router = express.Router()


router.post('/', async (req, res) => {

    const dataParam = {
        channel: req.body.channel,
        destination: req.body.destination,
        phone_number: req.body.phone_number,
        username: req.cookies.username
    }

    const pickupResponse = await pickupController.pickup(dataParam)
    const d = pickupResponse[0].actionid

    var s = new Date(d * 1000).toLocaleString("sv-SE")

    var pickupAt = s


    let data = {

        total_data: 1,
        data: pickupResponse

    }



    if (pickupResponse[0].response !== 'Error') {
        const updated = await userController.updateData({ user_activity_id: 9 }, { id: req.cookies.user_id })

        if (updated) {
            const call_id = req.body.call_id

            const update_call = await callsController.updateData({ pickup_date: 'NOW()' }, { id: call_id })
            console.log(update_call)
        }

    }
    return responses.sendSuccessData(res, data)

})


module.exports = router

