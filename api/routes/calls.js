const express = require('express')
const callSchema = require('../schema/calls')
const callsController = require('../controller/calls')
const response = require('../helpers/response')
const router = express.Router()
const validationMiddleware = require('../middleware/validation')
const config = require('../config/index')

router.get('/', async (req, res, next) => {
	const conditions = req.query
	const result = await callsController.getAll(conditions)
	
	return response.sendSuccessData(res, result)
})


router.get('/qa_list', async (req, res, next) => {
	const conditions = req.query
	const result = await callsController.getQAlist(conditions)
	
	return response.sendSuccessData(res, result)
})

router.get('/recording', async (req, res, next) => {
	const conditions = req.query
	const result = await callsController.getRecording(conditions)
	
	return response.sendSuccessData(res, result)
})

router.get('/report-call-activity', async (req, res, next) => {
	const conditions = req.query
	const result = await callsController.getReportCallActivity(conditions)
	
	return response.sendSuccessData(res, result)
})
router.get('/report-performance', async (req, res, next) => {
	const conditions = req.query
	const result = await callsController.getReportPerformanceAgent(conditions)
	
	return response.sendSuccessData(res, result)
})
router.get('/report-call-customer', async (req, res, next) => {
	const conditions = req.query
	const result = await callsController.getReportCallCustomer(conditions)
	
	return response.sendSuccessData(res, result)
})
router.get('/report-bussiness-achivement', async (req, res, next) => {
	const conditions = req.query
	const result = await callsController.getBussinesssAchivement(conditions)
	
	return response.sendSuccessData(res, result)
})

router.get('/report-cost-viewer', async (req, res, next) => {
	const conditions = req.query
	const result = await callsController.getCallCost(conditions)
	
	return response.sendSuccessData(res, result)
})

router.get('/report-checker', async (req, res, next) => {
	const conditions = req.query
	const result = await callsController.getReportChecker(conditions)
	
	return response.sendSuccessData(res, result)
})
router.get('/report-call-details', async (req, res, next) => {
	const conditions = req.query
	const result = await callsController.getReportCallDetail(conditions)
	
	return response.sendSuccessData(res, result)
})



router.post('/', async (req, res, next) => {
//router.post('/', validationMiddleware(callSchema.create, 'body'), async (req, res, next) => {
	console.log(req.body)
	const result = await callsController.insertData(req.body)

	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendCreated(res, result)
})

router.get('/:id', validationMiddleware(callSchema.detail, 'params'), async (req, res, next) => {
	const conditions = {id: req.params.id}
	const result = await callsController.getDetail(conditions)

	if (result.data === false) {
		return response.sendDataNotFound(res, result)
	}

	return response.sendSuccessData(res, result)
})

router.put('/:id', validationMiddleware(callSchema.detail, 'params'), validationMiddleware(callSchema.update, 'body', true), async (req, res, next) => {
    const conditions = {id: req.params.id}
    const data = {
        //update_user_id: req.body.user_id,
        //info: req.body.info,
        //is_active: req.body.is_active
    }
	const result = await callsController.updateData(req.body, conditions)
	
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
