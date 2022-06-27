const express = require('express')
const outboundSchema = require('../schema/outbound')
const outboundController = require('../controller/outbound')
const userController = require('../controller/users')
const response = require('../helpers/response')
const router = express.Router()
const validationMiddleware = require('../middleware/validation')
router.post('/', validationMiddleware(outboundSchema.hangup, 'body'), async (req, res, next) => {
    const result = await outboundController.hangup(req.body)
    if (result.data === false) {
        return response.sendBadRequest(res, 'Invalid Data')
    }
    else {
        const updated = await userController.updateData({ user_activity_id: 2 }, { id: req.cookies.user_id })
    }
    const data = {
        data: result
    }
    return response.sendSuccessData(res, data)
})

// for existing endpoint with other request method
router.all(['/', '/:id'], (req, res, next) => {
    response.sendMethodNotAllowed(res)
})

module.exports = router
