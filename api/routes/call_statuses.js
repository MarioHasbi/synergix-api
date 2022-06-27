const express = require('express')
const callSchema = require('../schema/documents')
const documentsController = require('../controller/call_statuses')
const fileMiddleware = require('../middleware/file_validation')
const response = require('../helpers/response')
const router = express.Router()
const validationMiddleware = require('../middleware/validation')

router.get('/', async (req, res, next) => {
	const conditions = req.query
	const result = await documentsController.getAll(conditions)
	
	return response.sendSuccessData(res, result)
})

router.get('/:id', validationMiddleware(callSchema.detail, 'params'), async (req, res, next) => {
	const conditions = {id: req.params.id}
	const result = await documentsController.getDetail(conditions)

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
