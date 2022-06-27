const express = require('express');
const response = require('../helpers/response')
const router = express.Router()
const controller = require('../controller/user_levels')
const schema = require('../schema/user_levels')
const validationMiddleware = require('../middleware/validation')

router.get('/', async (req, res, next) => {
	const conditions = req.query
	const result = await controller.getAll(conditions)
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

router.post('/', validationMiddleware(schema.create, 'body'), async (req, res, next) => {
	const result = await controller.insertData(req.body)

	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendCreated(res, result)
})

router.put('/:id', validationMiddleware(schema.detail, 'params'), validationMiddleware(schema.create, 'body'), async (req, res, next) => {
	const conditions = { id: req.params.id }
	const result = await controller.updateData(req.body, conditions)
	if (result.data === false) {
		return response.sendDataNotFound(res, result)
	}

	return response.sendSuccessData(res, result)
})


// for existing endpoint with other request method
router.all(['/', '/:id'], (req, res, next) => {
	response.sendMethodNotAllowed(res)
})

module.exports = router
