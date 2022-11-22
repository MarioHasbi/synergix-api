const express = require('express')
const schema = require('../schema/emails')
const controller = require('../controller/emails')
const response = require('../helpers/response')
const router = express.Router()
const validationMiddleware = require('../middleware/validation')
const fileMiddleware = require('../middleware/file_validation')
const emailAttachmentsController = require('../controller/email_attachments')



router.get('/', async (req, res, next) => {
	const conditions = req.query
	const result = await controller.getAll(conditions)
	if (result.data === false) {
		return response.sendDataNotFound(res, result)
	}

	return response.sendSuccessData(res, result)
})

router.get('/report-emails', async (req, res, next) => {
	const conditions = req.query
	const result = await controller.getReportEmails(conditions)
	if (result.data === false) {
		return response.sendDataNotFound(res, result)
	}

	return response.sendSuccessData(res, result)
})

router.get('/:id', validationMiddleware(schema.detail, 'params'), async (req, res, next) => {
	const conditions = { id: req.params.id }
	const result = await controller.getDetail(conditions)

	if (result.data === false) {
		return response.sendDataNotFound(res, result)
	}

	return response.sendSuccessData(res, result)
})

router.post('/:id/attachments', fileMiddleware.multiFile({ fieldName: 'file', fileSizeLimit: 1, fileType: 'emailOutbox', fileMaxTotal: 5 }), async (req, res, next) => {
	const files = req.files
	let data = []	
	for (i = 0; i < files.length; i++)  {
		const file = {
			email_id: req.params.id,
			path: files[i].destination,
			filename: files[i].filename,
			file_size: files[i].size,
			mime_type: files[i].mimetype
		}

		data.push(file)
	}

	const result = await emailAttachmentsController.insertManyData(data)
	
	
	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}else{
		const complete = await controller.updateData({ is_complete : 1 }, {id : req.params.id})	
	}

	return response.sendCreated(res, result)
})

router.post('/', validationMiddleware(schema.create, 'body'), async (req, res, next) => {
	const result = await controller.insertData(req.body)

	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendCreated(res, result)
})

router.post('/forgot_password', validationMiddleware(schema.forgotPassword, 'body'), async (req, res, next) => {
	const result = await controller.insertData(req.body)

	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendCreated(res, result)
})

router.put('/:id', validationMiddleware(schema.detail, 'params'), validationMiddleware(schema.update, 'body'), async (req, res, next) => {
	const conditions = { id: req.params.id }
	const result = await controller.updateData(req.body, conditions)

	if (result.data === false) {
		return response.sendDataNotFound(res, result)
	}

	return response.sendSuccessData(res, result)
})

router.all(['/', '/:id'], (req, res, next) => {
	response.sendMethodNotAllowed(res)
})

module.exports = router