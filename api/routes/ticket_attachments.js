const express = require('express')
const response = require('../helpers/response')
const router = express.Router()
const ticketAttachmentSchema = require('../schema/ticket_attachments')
const ticketAttachmentsController = require('../controller/ticket_attachments')
const validationMiddleware = require('../middleware/validation')

router.get('/:id', validationMiddleware(ticketAttachmentSchema.detail, 'params'), async (req, res, next) => {
	const conditions = {id: req.params.id}
	const result = await ticketAttachmentsController.getDetail(conditions)

	if (result.data === false) {
		return response.sendDataNotFound(res, result)
	}

	return response.sendSuccessData(res, result)
})

router.put('/:id', validationMiddleware(ticketAttachmentSchema.detail, 'params'), validationMiddleware(ticketAttachmentSchema.update, 'body'), async (req, res, next) => {
	const conditions = {id: req.params.id}
	const result = await ticketAttachmentsController.updateData(req.body, conditions)

	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendSuccessData(res, result)
})

// for existing endpoint with other request method
router.all(['/:id'], (req, res, next) => {
	response.sendMethodNotAllowed(res)
})

module.exports = router
