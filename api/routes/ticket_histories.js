const express = require('express')
const response = require('../helpers/response')
const router = express.Router()
const ticketHistoriesController = require('../controller/ticket_histories')
const ticketHistorySchema = require('../schema/ticket_histories')
const validationMiddleware = require('../middleware/validation')

router.get('/:id', validationMiddleware(ticketHistorySchema.detail, 'params'), async (req, res, next) => {
	const conditions = {id: req.params.id}
	const result = await ticketHistoriesController.getDetail(conditions)

	if (result.data === false) {
		return response.sendDataNotFound(res, result)
	}

	return response.sendSuccessData(res, result)
})

// for existing endpoint with other request method
router.all(['/:id'], (req, res, next) => {
	response.sendMethodNotAllowed(res)
})

module.exports = router
