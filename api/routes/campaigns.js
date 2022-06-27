const express = require('express')
const Schema = require('../schema/campaigns')
const Controller = require('../controller/campaigns')
const FileUploadControl = require('../controller/file_uploads')
const CustomerControl = require('../controller/customers')
const response = require('../helpers/response')
const router = express.Router()
const validationMiddleware = require('../middleware/validation')
const fileMiddleware = require('../middleware/file_validation')
const config = require('../config')




router.get('/', async (req, res, next) => {

	const conditions = req.query
	const userId = req.cookies.user_id
	const userLevelId = req.cookies.user_level_id

	let result

	if (userLevelId === config.user_level.agent) {
		conditions['user_id'] = userId
		result = await Controller.getAllByUser(conditions)
	} else {
		result = await Controller.getAll(conditions)
	}

	return response.sendSuccessData(res, result)
})

router.get('/listcall', async (req, res, next) => {
	const conditions = (req.query)
	// const result = await Controller.listCampaignCall(conditions)
	const result = await Controller.listCampaignCall(conditions)

	if (result.data === false) {
		return response.sendDataNotFound(res, result)
	}

	return response.sendSuccessData(res, result)
})



router.get('/listemail', async (req, res, next) => {
	const conditions = (req.query)

	const result = await Controller.listEmailCampaign(conditions)

	if (result.data === false) {
		return response.sendDataNotFound(res, result)
	}

	return response.sendSuccessData(res, result)
})

router.post('/', async (req, res, next) => {
	//router.post('/', validationMiddleware(callSchema.create, 'body'), async (req, res, next) => {
	let body = {
		sort: req.body.sort,
		code: req.body.code,
		media_id: req.body.media_id,
		name: req.body.name,
		start_date: req.body.start_date,
		end_date: req.body.end_date,
		last_generate_date: req.body.last_generate_date,
		info: req.body.info,
		is_default: req.body.is_default,
		is_active: req.body.is_active,
		created_at: 'NOW()',
		created_by: req.cookies.user_id
	}
	const result = await Controller.insertData(body)
	console.log(result)
	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendCreated(res, result)
})

router.post('/:id/upload', fileMiddleware.singleFile({ fieldName: 'file', fileSizeLimit: 1, fileType: 'public', fileFilter: 'excel' }), async (req, res, next) => {
	const file = req.file
	const campaign_id = req.params.id
	const user_id = req.decoded.id || 0

	const fileExist = await FileUploadControl.getDetail({ original_filename: file.originalname, is_active: 1 })

	if (fileExist.data === false) {

		const data = {
			original_filename: file.originalname,
			uploaded_filename: file.filename,
			path: file.destination,
			mimetype: file.mimetype,
			filesize: file.size,
			file_type_id: 1, // 1 = Customer file
			campaign_id: campaign_id,
			created_by: user_id,
			created_at: 'NOW()'
		}


		const result = await Controller.upload(data)

		if (result.data === false) {
			return response.sendBadRequest(res, 'Invalid Data')
		}


		return response.sendCreated(res, result)
	}
	else {
		return response.sendBadRequest(res, 'Duplicate Data')
	}
}
)



router.post('/:id/upload_info', fileMiddleware.singleFile({ fieldName: 'file', fileSizeLimit: 2, fileType: 'info' }), async (req, res, next) => {
	const file = req.file
	const campaign_id = req.params.id
	const user_id = req.decoded.id || 0

	const fileExist = await FileUploadControl.getDetail({ original_filename: file.originalname, is_active: 1, campaign_id: campaign_id })

	if (fileExist.data === false) {

		const data = {
			original_filename: file.originalname,
			uploaded_filename: file.filename,
			path: file.destination,
			mimetype: file.mimetype,
			filesize: file.size,
			file_type_id: 3, // 3 = Campaign Info
			campaign_id: campaign_id,
			created_by: user_id,
			created_at: 'NOW()'
		}


		const result = await Controller.upload_info(data)

		if (result.data === false) {
			return response.sendBadRequest(res, 'Invalid Data')
		}


		return response.sendCreated(res, result)
	}
	else {
		return response.sendBadRequest(res, 'Duplicate Data')
	}
}
)


router.post('/:id/importcallcampaign', async (req, res, next) => {
	const campaign_id = req.params.id
	const file_upload_id = req.body.file_upload_id
	const user_id = req.decoded.id || 0
	const dataParams = req.body

	delete dataParams.file_upload_id

	const result = await Controller.importCallCampaign(user_id, campaign_id, file_upload_id, dataParams)

	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendCreated(res, result)
})


router.post('/:id/importemailcampaign', async (req, res, next) => {
	const campaign_id = req.params.id
	const file_upload_id = req.body.file_upload_id
	const user_id = req.decoded.id || 0
	const dataParams = req.body

	delete dataParams.file_upload_id

	const result = await Controller.importEmailCampaign(user_id, campaign_id, file_upload_id, dataParams)

	if (result.data === false) {
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

router.put('/rollback/:id', async (req, res, next) => {
	const conditions = { id: req.params.id }
	const rollbackFIleUpload = await FileUploadControl.updateData({ is_active: 0 }, conditions)


	if (rollbackFIleUpload.data !== false) {
		const rollbackCustomer = await CustomerControl.updateData({ is_active: 0 }, { file_upload_id: req.params.id })
		if (rollbackCustomer.data === false) {
			return response.sendDataNotFound(res, rollbackCustomer)
		}
		else {
			return response.sendSuccessData(res, rollbackCustomer)

		}
	}
	return response.sendDataNotFound(res, rollbackFIleUpload)


})

router.put('/:id', validationMiddleware(Schema.update, 'body'), async (req, res, next) => {
	const conditions = { id: req.params.id }
	let body = {
		sort: req.body.sort,
		code: req.body.code,
		media_id: req.body.media_id,
		name: req.body.name,
		start_date: req.body.start_date,
		end_date: req.body.end_date,
		last_generate_date: req.body.last_generate_date,
		info: req.body.info,
		is_default: req.body.is_default,
		is_active: req.body.is_active,
		updated_at: 'NOW()',
		updated_by: req.cookies.user_id
	}
	const result = await Controller.updateData(body, conditions)

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
