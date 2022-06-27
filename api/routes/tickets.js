const express = require('express');
const fileMiddleware = require('../middleware/file_validation')
const recordMiddleware = require('../middleware/record_validation')
const response = require('../helpers/response')
const router = express.Router()
const ticketAttachmentsController = require('../controller/ticket_attachments')
const ticketHistoriesController = require('../controller/ticket_histories')
const ticketSchema = require('../schema/tickets')
const ticketsController = require('../controller/tickets')
const validationMiddleware = require('../middleware/validation')

router.get('/', async (req, res, next) => {
	const conditions = req.query
	const result = await ticketsController.getAll(conditions)

	return response.sendSuccessData(res, result)
})

router.get('/:id', validationMiddleware(ticketSchema.detail, 'params'), async (req, res, next) => {
	const conditions = { id: req.params.id }
	const result = await ticketsController.getDetail(conditions)

	if (result.data === false) {
		return response.sendDataNotFound(res, result)
	}

	return response.sendSuccessData(res, result)
})

router.post('/', validationMiddleware(ticketSchema.create, 'body'), async (req, res, next) => {
	const result = await ticketsController.insertData(req.body)

	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendUpdated(res, result)
})

router.put('/:id', validationMiddleware(ticketSchema.detail, 'params'), async (req, res, next) => {
	const conditions = { id: req.params.id }
	const result = await ticketsController.updateData(req.body, conditions)

	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendSuccessData(res, result)
})

router.post('/:id/histories', validationMiddleware(ticketSchema.detail, 'params'), recordMiddleware.tickets, validationMiddleware(ticketSchema.histories, 'body'), async (req, res, next) => {
	const body = req.body
	const data = {
		ticket_id: req.params.id,
		ticket_status_id: body.ticket_status_id,
		user_id: body.user_id,
		note: body.note
	}
	const result = await ticketHistoriesController.insertData(data)

	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendCreated(res, result)
})

router.post('/:id/attachments', validationMiddleware(ticketSchema.detail, 'params'), recordMiddleware.tickets, fileMiddleware.singleFile({ fieldName: 'file', fileSizeLimit: 1, fileType: 'ticket' }), validationMiddleware(ticketSchema.upload, 'body', true), async (req, res, next) => {
	const file = req.file
	const data = {
		ticket_id: req.params.id,
		path: file.destination,
		filename: file.filename,
		file_size: file.size,
		mime_type: file.mimetype,
		user_id: req.body.user_id
	}
	const result = await ticketAttachmentsController.insertData(data)

	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendCreated(res, result)
})

router.post('/:id/attachments/multiple', validationMiddleware(ticketSchema.detail, 'params'), recordMiddleware.tickets, fileMiddleware.multiFile({ fieldName: 'file', fileSizeLimit: 1, fileType: 'ticket', fileMaxTotal: 5 }), validationMiddleware(ticketSchema.upload, 'body', true), async (req, res, next) => {
	const files = req.files
	let data = []

	for (key in files) {
		const file = {
			ticket_id: req.params.id,
			path: files[key].destination,
			filename: files[key].filename,
			file_size: files[key].size,
			mime_type: files[key].mimetype,
			user_id: req.body.user_id
		}

		data.push(file)
	}

	const result = await ticketAttachmentsController.insertManyData(data)

	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendCreated(res, result)
})

router.get('/:id/histories', validationMiddleware(ticketSchema.detail, 'params'), recordMiddleware.tickets, async (req, res, next) => {
	const conditions = { ticket_id: req.params.id }
	const result = await ticketHistoriesController.getAll(conditions)

	if (result.data === false) {
		return response.sendDataNotFound(res, result)
	}

	return response.sendSuccessData(res, result)
})

router.get('/:id/attachments', validationMiddleware(ticketSchema.detail, 'params'), recordMiddleware.tickets, async (req, res, next) => {
	const conditions = { ticket_id: req.params.id }
	const result = await ticketAttachmentsController.getAll(conditions)

	if (result.data === false) {
		return response.sendDataNotFound(res, result)
	}

	return response.sendSuccessData(res, result)
})

// for existing endpoint with other request method
router.all(['/', '/:id/histories', '/:id/attachments', '/:id/attachments/multiple', '/:id'], (req, res, next) => {
	response.sendMethodNotAllowed(res)
})

module.exports = router
