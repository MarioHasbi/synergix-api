const express = require('express')
const amiSchema = require('../schema/ami')
const queuesController = require('../controller/queues')
const queueMembersController = require('../controller/queue_members')
const response = require('../helpers/response')
const router = express.Router()
const validationMiddleware = require('../middleware/validation')

router.put('/:id/members', validationMiddleware(amiSchema.queueDetail, 'params'), validationMiddleware(amiSchema.queueMemberUpdate, 'body'), async (req, res, next) => {
	const conditions = {
		id: req.params.id
	}
	const result = await queuesController.updateMember(req.body, conditions)

	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendSuccessData(res, result)
})

router.put('/:id/member_statuses', validationMiddleware(amiSchema.queueDetail, 'params'), validationMiddleware(amiSchema.queueMemberStatusUpdate, 'body'), async (req, res, next) => {
	
	const {is_paused,extension} = req.body
	const conditions = {
		queue: req.params.id,
		extension:extension 
	}
	const getQueueMember = await queueMembersController.getAll({ extension: extension })
	if (Object.entries(getQueueMember.data).length > 0) {
		queueMemberResponse = await queueMembersController.AmiPauseQueueMembers(getQueueMember.data,is_paused)
		await queuesController.updateStatusMember(req.body, conditions)
	} else {
		return responses.sendMsgNotFound(res, 'Extension Not Found')
	}

	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendSuccessData(res, result)
})

// for existing endpoint with other request method
router.all(['/:id/members', '/:id/member_statuses'], (req, res, next) => {
	response.sendMethodNotAllowed(res)
})

module.exports = router
