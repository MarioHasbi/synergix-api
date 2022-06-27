const express = require('express')
const productsSchema = require('../schema/products')
const productsController = require('../controller/products')
const response = require('../helpers/response')
const router = express.Router()
const validationMiddleware = require('../middleware/validation')

router.get('/', async (req, res, next) => {
	const conditions = req.query
	const result = await productsController.getAll(conditions)
	
	return response.sendSuccessData(res, result)
})

router.post('/', async (req, res, next) => {
//router.post('/', validationMiddleware(callSchema.create, 'body'), async (req, res, next) => {
	console.log(req.body)
	const result = await productsController.insertData(req.body)
console.log(result)
	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendCreated(res, result)
})

router.get('/:id', validationMiddleware(productsSchema.detail, 'params'), async (req, res, next) => {
	const conditions = {id: req.params.id}
	const result = await productsController.getDetail(conditions)

	if (result.data === false) {
		return response.sendDataNotFound(res, result)
	}

	return response.sendSuccessData(res, result)
})

router.put('/:id', validationMiddleware(productsSchema.update, 'body'), async (req, res, next) => {
	const conditions = {id: req.params.id}
	console.log(req.body)
	const result = await productsController.updateData(req.body, conditions)

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
