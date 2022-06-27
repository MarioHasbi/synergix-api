const express = require('express')
const Schema = require('../schema/quality_assurance_users')
const Controller = require('../controller/quality_assurance_users')
const response = require('../helpers/response')
const router = express.Router()
const validationMiddleware = require('../middleware/validation')

router.get('/', async (req, res, next) => {
	const conditions = req.query
	const result = await Controller.getAll(conditions)
	
	return response.sendSuccessData(res, result)
})


router.post('/', validationMiddleware(Schema.create, 'body'), async (req, res, next) => {
	let body = {
		quality_assurance_id:req.body.quality_assurance_id,
		user_id:req.body.user_id,
		call_id:req.body.call_id,
		quality_assurance_date:req.body.quality_assurance_date,
		observer_id:req.cookies.user_id||0,
		period_id:req.body.period_id,
		notes:req.body.notes
	}
	const result = await Controller.insertData(body)

	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendCreated(res, result)
})

router.get('/:id', validationMiddleware(Schema.detail, 'params'), async (req, res, next) => {
	const conditions = {id: req.params.id}
	const result = await Controller.getDetail(conditions)

	if (result.data === false) {
		return response.sendDataNotFound(res, result)
	}

	return response.sendSuccessData(res, result)
})

router.put('/:id', validationMiddleware(Schema.update, 'body'), async (req, res, next) => {
	const conditions = {id: req.params.id}
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
