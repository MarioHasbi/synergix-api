const express = require('express')
const documentSchema = require('../schema/documents')
const documentsController = require('../controller/documents')
const fileMiddleware = require('../middleware/file_validation')
const response = require('../helpers/response')
const router = express.Router()
const validationMiddleware = require('../middleware/validation')

router.get('/', async (req, res, next) => {
	const conditions = req.query
	const result = await documentsController.getAll(conditions)
	
	return response.sendSuccessData(res, result)
})

router.post('/', fileMiddleware.singleFile({fieldName: 'file', fileSizeLimit: 1, fileType: 'info'}), validationMiddleware(documentSchema.create, 'body', true), async (req, res, next) => {
	const file = req.file
	const data = {
        create_user_id: req.body.user_id,
        info: req.body.info,
        is_active: req.body.is_active,
		path: file.destination,
		filename: file.filename,
		file_size: file.size,
		mime_type: file.mimetype
	}
	const result = await documentsController.insertData(data)

	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendCreated(res, result)
})

router.post('/multiple', fileMiddleware.multiFile({fieldName: 'file', fileSizeLimit: 1, fileType: 'info', fileMaxTotal: 5}), validationMiddleware(documentSchema.create, 'body', true), async (req, res, next) => {
	const files = req.files
	let data = []

	for (key in files) {
		const file = {
            create_user_id: req.body.user_id,
            info: req.body.info,
            is_active: req.body.is_active,
			path: files[key].destination,
			filename: files[key].filename,
			file_size: files[key].size,
			mime_type: files[key].mimetype
		}

		data.push(file)
	}

	const result = await documentsController.insertManyData(data)

	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendCreated(res, result)
})

router.get('/:id', validationMiddleware(documentSchema.detail, 'params'), async (req, res, next) => {
	const conditions = {id: req.params.id}
	const result = await documentsController.getDetail(conditions)

	if (result.data === false) {
		return response.sendDataNotFound(res, result)
	}

	return response.sendSuccessData(res, result)
})

router.put('/:id', validationMiddleware(documentSchema.detail, 'params'), validationMiddleware(documentSchema.update, 'body', true), async (req, res, next) => {
    const conditions = {id: req.params.id}
    const data = {
        update_user_id: req.body.user_id,
        info: req.body.info,
        is_active: req.body.is_active
    }
	const result = await documentsController.updateData(data, conditions)
	
	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendSuccessData(res, result)
})

// for existing endpoint with other request method
router.all(['/', '/multiple', '/:id'], (req, res, next) => {
	response.sendMethodNotAllowed(res)
})

module.exports = router
