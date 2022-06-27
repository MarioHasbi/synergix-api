const express = require('express')
const Schema = require('../schema/quality_assurance_details')
const Controller = require('../controller/quality_assurance_details')
const response = require('../helpers/response')
const router = express.Router()
const validationMiddleware = require('../middleware/validation')

router.get('/', async (req, res, next) => {
	const conditions = req.query
	const result = await Controller.getAll(conditions)

	return response.sendSuccessData(res, result)
})

router.get('/export', async (req, res, next) => {
	const conditions = req.query
	const result = await Controller.getQADetails(conditions)

	return response.sendSuccessData(res, result)
})

router.get('/report-qa-summaries', async (req, res, next) => {
	const conditions = req.query
	const result = await Controller.getQASummaries(conditions)

	return response.sendSuccessData(res, result)
})


router.post('/', async (req, res, next) => {
	console.log(req.body)

	const result = await Controller.insertManyData(req.body)

	if (result.data === false) {
		if (`${req.body.quality_assurance_user_id}` > 0 && `${req.body.quality_assurance_aspect_id}` > 0) {
			const result = await Controller.insertData(req.body)
			return response.sendCreated(res, result)
		}
		
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendCreated(res, result)
})

router.get('/:id', validationMiddleware(Schema.detail, 'params'), async (req, res, next) => {
	const conditions = { id: req.params.id }
	const result = await Controller.getDetail(conditions)

	if (result.data === false) {
		return response.sendDataNotFound(res, result)
	}

	return response.sendSuccessData(res, result)
})

router.put('/:id', validationMiddleware(Schema.update, 'body'), async (req, res, next) => {
	const conditions = { id: req.params.id }
	console.log(req.body)
	const result = await Controller.updateData(req.body, conditions)

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
