const express = require('express')
const logoutSchema = require('../schema/logout')
const logoutController = require('../controller/logout')
const queueMembersController = require('../controller/queue_members')
const extensionsController = require('../controller/extensions')
const response = require('../helpers/response')
const router = express.Router()
const validationMiddleware = require('../middleware/validation')

router.post('/', validationMiddleware(logoutSchema.logout, 'body'), async (req, res, next) => {
    const { extension } = req.body
    const getQueueMember = await queueMembersController.getAll({ extension: extension })
    const queueRespone = await logoutController.logout(getQueueMember.data)
    await extensionsController.updateData({user_id: 0},{ext_no:extension})
    let data = {
        data: {
            queue_members: queueRespone
        }
    } 
    return response.sendSuccessData(res, data)
})

// for existing endpoint with other request method
router.all(['/', '/:id'], (req, res, next) => {
    response.sendMethodNotAllowed(res)
})

module.exports = router
