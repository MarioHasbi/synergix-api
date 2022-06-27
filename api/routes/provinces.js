const express = require('express')
const provincesSchema = require('../schema/provinces')
const provincesController = require('../controller/provinces')
const response = require('../helpers/response')
const router = express.Router()
const validationMiddleware = require('../middleware/validation')

router.get('/', async (req, res, next) => {
	const conditions = req.query
	const result = await provincesController.getAll(conditions)
	
	return response.sendSuccessData(res, result)
})

router.post('/', async (req, res, next) => {
//router.post('/', validationMiddleware(callSchema.create, 'body'), async (req, res, next) => {
	console.log(req.body)
	const result = await provincesController.insertData(req.body)
console.log(result)
	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendCreated(res, result)
})

router.get('/:id', validationMiddleware(provincesSchema.detail, 'params'), async (req, res, next) => {
	const conditions = {id: req.params.id}
	const result = await provincesController.getDetail(conditions)

	if (result.data === false) {
		return response.sendDataNotFound(res, result)
	}

	return response.sendSuccessData(res, result)
})

router.put('/:id', validationMiddleware(provincesSchema.update, 'body'), async (req, res, next) => {
	const conditions = {id: req.params.id}
	console.log(req.body)
	const result = await provincesController.updateData(req.body, conditions)

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
