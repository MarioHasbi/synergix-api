const express = require('express')
const media_productsSchema = require('../schema/media_products')
const media_productsController = require('../controller/media_products')
const fileMiddleware = require('../middleware/file_validation')
const response = require('../helpers/response')
const router = express.Router()
const validationMiddleware = require('../middleware/validation')

router.get('/', async (req, res, next) => {
	const conditions = req.query
	const result = await media_productsController.getAll(conditions)
	
	return response.sendSuccessData(res, result)
})

router.post('/', async (req, res, next) => {
//router.post('/', validationMiddleware(callSchema.create, 'body'), async (req, res, next) => {
	console.log(req.body)
	const result = await media_productsController.insertData(req.body)
console.log(result)
	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendCreated(res, result)
})

router.get('/:id', validationMiddleware(media_productsSchema.detail, 'params'), async (req, res, next) => {
	const conditions = {id: req.params.id}
	const result = await media_productsController.getDetail(conditions)

	if (result.data === false) {
		return response.sendDataNotFound(res, result)
	}

	return response.sendSuccessData(res, result)
})

router.put('/:id', validationMiddleware(media_productsSchema.update, 'body'), async (req, res, next) => {
	const conditions = {id: req.params.id}
	console.log(req.body)
	const result = await media_productsController.updateData(req.body, conditions)

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
