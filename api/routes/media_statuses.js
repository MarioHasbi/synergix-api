const express = require('express')
const media_statusesSchema = require('../schema/media_statuses')
const media_statusesController = require('../controller/media_statuses')
const response = require('../helpers/response')
const router = express.Router()
const validationMiddleware = require('../middleware/validation')

router.get('/', async (req, res, next) => {
	const conditions = req.query
	const result = await media_statusesController.getAll(conditions)
	
	return response.sendSuccessData(res, result)
})

router.post('/', async (req, res, next) => {
//router.post('/', validationMiddleware(callSchema.create, 'body'), async (req, res, next) => {
	console.log(req.body)
	const result = await media_statusesController.insertData(req.body)
console.log(result)
	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendCreated(res, result)
})

router.get('/:id', validationMiddleware(media_statusesSchema.detail, 'params'), async (req, res, next) => {
	const conditions = {id: req.params.id}
	const result = await media_statusesController.getDetail(conditions)

	if (result.data === false) {
		return response.sendDataNotFound(res, result)
	}

	return response.sendSuccessData(res, result)
})

router.put('/:id', validationMiddleware(media_statusesSchema.update, 'body'), async (req, res, next) => {
	const conditions = {id: req.params.id}
	console.log(req.body)
	const result = await media_statusesController.updateData(req.body, conditions)

	console.log(result)
	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendSuccessData(res, result)	
})

// for existing endpoint with other request method
router.all(['/', '/:id'], (req, res, next) => {
	response.sendMethodNotAllowed(res)
})

module.exports = router
