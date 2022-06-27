const express = require('express')
const outboundSchema = require('../schema/outbound')
const outboundController = require('../controller/outbound')
const callsController = require('../controller/calls')
const response = require('../helpers/response')
const router = express.Router()
const validationMiddleware = require('../middleware/validation')
const redisHelper = require('../helpers/redis')

router.post('/dial', validationMiddleware(outboundSchema.dial, 'body'), async (req, res, next) => {
    const {source,destination} = req.body
    const insertCalls = await callsController.insertData({
        phone_number:destination,
        user_id:req.decoded.user_id,
        direction_id:"OUTBOUND",
        extension:source
    })  
    const concatBody = {...req.body,...{actionid:'outbound-'+insertCalls.data.id}}
    const result = await outboundController.dial(concatBody)
    if (result.data === false) {
        return response.sendBadRequest(res, 'Invalid Data')
    }
    const data = { 
        data: result
     } 
    return response.sendSuccessData(res, data)
})

router.post('/hangup', validationMiddleware(outboundSchema.hangup, 'body'), async (req, res, next) => {
    const result = await outboundController.hangup(req.body)
    if (result.data === false) {
        return response.sendBadRequest(res, 'Invalid Data')
    } 
    const data = { 
        data: result
     } 
    return response.sendSuccessData(res, data)
})

// for existing endpoint with other request method
router.all(['/dial', '/:id'], (req, res, next) => {
    response.sendMethodNotAllowed(res)
})

module.exports = router
