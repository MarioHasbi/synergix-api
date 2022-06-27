const config = require('../config/')
const authController = require('../controller/auth')
const bcrypt = require('bcrypt')
const express = require('express');
const fileMiddleware = require('../middleware/file_validation')
const response = require('../helpers/response')
const router = express.Router()
const userSchema = require('../schema/users')
const usersController = require('../controller/users')
const queueMembersController = require('../controller/queue_members')
const extensionController = require('../controller/extensions')
const breakhistoriesController = require('../controller/break_histories')


const validationMiddleware = require('../middleware/validation')
const dateFormat = require('dateformat')
const cookieConfig = require('../config/cookie');
const { route } = require('./calls');

router.post('/login', validationMiddleware(userSchema.login, 'body'), async (req, res, next) => {
	let dataParam = req.body
	let password = dataParam.password
	let extension = dataParam.extension
	const extCondition = { ext_no: extension }
	delete dataParam.password
	delete dataParam.extension


	// get user by username
	const user = await usersController.getDetail(dataParam)

	if (user.data === false) {
		return response.sendDataNotFound(res, user)
	}

	// check password
	if (!bcrypt.compareSync(password, user.data.password)) {
		return response.sendDataNotFound(res, user)
	}

	if (typeof extension !== undefined && extension) {
		const getExt = await extensionController.getDetail({ ext_no: extension })
		if (getExt.data.user_id == null || getExt.data.user_id == user.data.id || getExt.data.user_id == 0) {

			const ext_status = await extensionController.updateData({ user_id: user.data.id }, extCondition)
			if (ext_status.data === false) {
				return response.sendMsgNotFound(res, 'Extension not registered')
			}

		} else {
			res.clearCookie('xtoken', cookieConfig.cookie_option)
			res.clearCookie('ytoken', {
				...cookieConfig.user_cookie_option,
				maxAge: 0
			})
			res.clearCookie('username', {
				...cookieConfig.user_cookie_option,
				maxAge: 0
			})
			res.clearCookie('user_level_id', {
				...cookieConfig.user_cookie_option,
				maxAge: 0
			})
			res.clearCookie('ext', {
				...cookieConfig.user_cookie_option,
				maxAge: 0
			})
			res.clearCookie('socketAuth', {
				...cookieConfig.user_cookie_option,
				maxAge: 0
			})
			return response.sendMsgNotFound(res, 'Extension is already use by another ')
		}
	}

	const timestamp = new Date().getTime()
	const today = dateFormat(timestamp, 'yyyy-mm-dd')

	let data = {
		id: user.data.id || 0,
		user_level_id: user.data.user_level_id,
		password_expired: user.data.expiry_date <= today || false,
		username: dataParam.username || false,
		ip: req.connection.remoteAddress,
		user_agent: req.headers['user-agent']
	}		

	
	// Generate an access token
	const createToken = await authController.createToken(data)

	let data_user = { username: dataParam.username || false }
	const socketAuths = await authController.createToken(data_user)

	let splitToken = createToken.data.token.split('.')
	const xToken = `${splitToken[0]}.${splitToken[1]}`
	const yToken = splitToken[2]

	let responseData = {
		data: {
			username: dataParam.username || false,
			user_level_id: user.data.user_level_id,
			extension: `${extCondition.ext_no}`,
			password_expired: user.data.expiry_date <= today || false
		}
	}

	const user_id = user.data.id
	const username = dataParam.username || false
	const user_level_id = user.data.user_level_id
	const ext = `${extCondition.ext_no}`
	const socketAuth = socketAuths.data.token


	res.cookie('xtoken', xToken, cookieConfig.cookie_option)
	res.cookie('ytoken', yToken, cookieConfig.user_cookie_option)
	res.cookie('socketAuth', socketAuth, cookieConfig.user_cookie_option)
	res.cookie('user_id', user_id, cookieConfig.user_cookie_option)
	res.cookie('username', username, cookieConfig.user_cookie_option)
	res.cookie('user_level_id', user_level_id, cookieConfig.user_cookie_option)
	res.cookie('ext', ext, cookieConfig.user_cookie_option)

	await usersController.updateData({ user_activity_id: '2', last_activity_time: 'NOW()', host_address: req.connection.remoteAddress , is_login : 1}, { id: user.data.id }   )


	//return response.sendSuccessData(res, createToken)
	return response.sendSuccessData(res, responseData)
});


router.post('/logout', async (req, res, next) => {
	// get userId from decoded token
	const userId = req.decoded.id || 0
	const ext = req.cookies.ext
	let responseData = {
		data: {
			status: "logout"
		}
	}

	await usersController.updateData({ user_activity_id: '1', last_activity_time: 'NOW()' ,is_login : 0}, { id: userId })
	if (ext !== "0") {
		await extensionController.updateData({ user_id: "null" }, { ext_no: ext })
	}

	res.clearCookie('xtoken', cookieConfig.cookie_option)
	res.clearCookie('ytoken', {
		...cookieConfig.user_cookie_option,
		maxAge: 0
	})
	res.clearCookie('user_id', {
		...cookieConfig.user_cookie_option,
		maxAge: 0
	})
	res.clearCookie('username', {
		...cookieConfig.user_cookie_option,
		maxAge: 0
	})
	res.clearCookie('user_level_id', {
		...cookieConfig.user_cookie_option,
		maxAge: 0
	})
	res.clearCookie('ext', {
		...cookieConfig.user_cookie_option,
		maxAge: 0
	})
	// res.clearCookie('socketAuth', {
	// 	...cookieConfig.user_cookie_option,
	// 	maxAge: 0
	// })



	return response.sendSuccessData(res, responseData)
});

router.post('/', validationMiddleware(userSchema.create, 'body'), async (req, res, next) => {
	const saltRounds = 10
	const hashPassword = bcrypt.hashSync(`${config.user_passwd_default}`, saltRounds)
	const timestamp = new Date().getTime()
	const today = dateFormat(timestamp, 'yyyy-mm-dd')

	let body = {
		username: req.body.username,
		password: hashPassword,
		user_level_id: req.body.user_level_id,
		department_id: req.body.department_id,
		fullname: req.body.fullname,
		firstname: req.body.firstname,
		middlename: req.body.middlename,
		lastname: req.body.lastname,
		nickname: req.body.nickname,
		salutation: req.body.salutation,
		email: req.body.email,
		mobile: req.body.mobile,
		phone: req.body.phone,
		address: req.body.address,
		pbx_inbound: req.body.pbx_inbound,
		ext_inbound: req.body.ext_inbound,
		ext_inbound_pwd: req.body.ext_inbound_pwd,
		pbx_outbound: req.body.pbx_outbound,
		ext_outbound: req.body.ext_outbound,
		ext_outbound_pwd: req.body.ext_outbound_pwd,
		expiry_date: today,
		birth_date: req.body.birth_date,
		join_date: req.body.join_date,
		is_active: req.body.is_active,
		created_at: 'NOW()',
		created_by: req.decoded.id || 0
	}
	const result = await usersController.insertData(body)

	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendCreated(res, result)
})


router.get('/', async (req, res, next) => {
	const conditions = req.query
	const result = await usersController.getAll(conditions)

	return response.sendSuccessData(res, result)
})

router.get('/online', async (req, res, next) => {
	const conditions = req.query
	const result = await usersController.getOnlineUser(conditions)

	return response.sendSuccessData(res, result)

})

router.get('/available', async (req, res, next) => {

	const conditions = req.query
	const result = await usersController.getAvailableUsers(conditions)

	return response.sendSuccessData(res, result)

})

router.get('/:id', validationMiddleware(userSchema.detail, 'params'), async (req, res, next) => {
	const conditions = { id: req.params.id }
	const result = await usersController.getDetail(conditions)

	if (result.data === false) {
		return response.sendDataNotFound(res, result)
	}

	return response.sendSuccessData(res, result)
})

router.put('/:id', validationMiddleware(userSchema.update, 'body'), async (req, res, next) => {
	const conditions = { id: req.params.id }
	const saltRounds = 10
	const body = req.body
	if (typeof body.password !== "undefined") {
		const hashPassword = bcrypt.hashSync(body.password, saltRounds)
		body.password = hashPassword
		var future = new Date();
		const expire_timestamp = future.setDate(future.getDate() + 30);
		const expire = dateFormat(expire_timestamp, 'yyyy-mm-dd');
		body.expiry_date = expire;

	}

	if (typeof body.user_activity_id !== "undefined") {
		body.last_activity_time = "NOW()"

	}
	const result = await usersController.updateData(body, conditions)
	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}


	return response.sendSuccessData(res, result)
})

router.put('/break/:id', async (req, res, next) => {
	const conditions = { id: req.params.id }
	const body = { user_activity_id: '6', is_break: '1', last_activity_time: 'NOW()' }
	const result = await usersController.updateData(body, conditions)

	if (result.data !== false) {

		const body = { break_start: 'NOW()', break_reason_id: req.body.break_reason_id, user_id: req.params.id }

		const result = await breakhistoriesController.insertData(body)

		if (result.data === false) {
			return response.sendBadRequest(res, 'Invalid Data')
		}

		return response.sendCreated(res, result)
	}
	else {
		return response.sendBadRequest(res, 'Invalid Data')
	}

})


router.put('/unbreak/:id', async (req, res, next) => {

	const user = await usersController.getDetail({ id: req.cookies.user_id })

	if (bcrypt.compareSync(req.body.password, user.data.password)) {
		const conditions = { id: req.params.id }
		const body = { break_end: 'NOW()' }
		const result = await breakhistoriesController.updateData(body, conditions)

		if (result.data !== false) {
			const body = { user_activity_id: '8', is_break: '0', last_activity_time: 'NOW()' }
			const conditions = { id: req.cookies.user_id }
			const result = await usersController.updateData(body, conditions)
			if (result.data !== false) {
				return response.sendSuccessData(res, result)
			}
		} else {
			return response.sendBadRequest(res, 'Invalid Data')
		}
	}
	else {
		return response.sendBadRequest(res, 'Wrong Password')
	}

})

router.put('/activity/:ext', validationMiddleware(userSchema.userActivity, 'body'), async (req, res, next) => {
	let queueMemberPauseResponse = []
	const body = req.body
	const { user_activity_id } = body
	const getQueueMember = await queueMembersController.getAll({ extension: req.params.ext })
	if (user_activity_id == 2) {
		queueMemberPauseResponse = await queueMembersController.AmiPauseQueueMembers(getQueueMember.data, false)
	} else {
		queueMemberPauseResponse = await queueMembersController.AmiPauseQueueMembers(getQueueMember.data, true)
	}

	body.last_activity_time = "NOW()"
	const result = await usersController.updateData(body, { id: req.decoded.id })
	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}
	let results = {
		"request_time": result.request_time,
		"response_code": result.response_code,
		"success": result.success,
		"total_data": result.total_data,
		"data": {
			"id": result.data.id,
			queue_members_pause: queueMemberPauseResponse
		}
	}
	return response.sendSuccessData(res, results)
})

router.get('/:id/modules', validationMiddleware(userSchema.detail, 'params'), async (req, res, next) => {
	const conditions = { id: req.params.id }
	const result = await usersController.getAllModule(conditions)

	if (result.data === false) {
		return response.sendDataNotFound(res, result)
	}

	return response.sendSuccessData(res, result)
})

router.put('/:id/password', validationMiddleware(userSchema.detail, 'params'), validationMiddleware(userSchema.changePassword, 'body'), async (req, res, next) => {
	const saltRounds = 10
	const hashPassword = bcrypt.hashSync(req.body.new_password, saltRounds)
	const conditions = {
		id: req.params.id
	}
	const body = {
		password: hashPassword,
		password_exp_date: req.body.password_exp_date
	}

	// get user data
	const user = await usersController.getDetail(conditions)

	if (user.data === false) {
		return response.sendDataNotFound(res, user)
	}

	if (!bcrypt.compareSync(req.body.old_password, user.data.password)) {
		return response.sendDataNotFound(res, user)
	}

	const result = await usersController.updatePassword(body, conditions)

	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendSuccessData(res, result)
})

router.post('/email_verification', validationMiddleware(userSchema.detailEmail, 'body'), async (req, res, next) => {
	const conditions = { email: req.body.email }
	const result = await usersController.getDetail(conditions)

	if (result.data === false) {
		return response.sendDataNotFound(res, result)
	}

	return response.sendSuccessData(res, result)
})

router.post('/forgot_password', validationMiddleware(userSchema.forgotPassword, 'body'), async (req, res, next) => {
	const conditions = {
		email: req.body.email,
		is_active: 1,
		is_password_request: 0
	}
	const body = {
		is_password_request: 1,
		verification_code: req.body.verification_code
	}
	const result = await usersController.updatePassword(body, conditions)

	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendSuccessData(res, result)
})

router.put('/password_verification/:code', validationMiddleware(userSchema.verificationCode, 'params'), validationMiddleware(userSchema.forgotPasswordChange, 'body'), async (req, res, next) => {
	const conditions = {
		//email: req.body.email,
		verification_code: req.params.code, //req.body.verification_code,
		is_password_request: 1
	}
	let body = {
		is_password_request: 0,
		password_expiration_date: req.body.password_expiration_date || null
	}
	const saltRounds = 10
	body.password = bcrypt.hashSync(req.body.password, saltRounds)
	const result = await usersController.updatePassword(body, conditions)

	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendSuccessData(res, result)
})

router.get('/verification_code/:code', validationMiddleware(userSchema.verificationCode, 'params'), async (req, res, next) => {
	const conditions = {
		verification_code: req.params.code,
		is_password_request: 1
	}
	const result = await usersController.getDetail(conditions)

	if (result.data === false) {
		return response.sendDataNotFound(res, result)
	}

	return response.sendSuccessData(res, result)
})

router.put('/:id/photo', validationMiddleware(userSchema.detail, 'params'), fileMiddleware.singleFile({ fieldName: 'photo', fileSizeLimit: 1, fileType: 'userPhoto', fileFilter: 'image' }), async (req, res, next) => {
	const conditions = { id: req.params.id }
	const result = await usersController.uploadPhoto(req.body, conditions)

	if (result.data === false) {
		return response.sendBadRequest(res, 'Invalid Data')
	}

	return response.sendSuccessData(res, result)
})

// for existing endpoint with other request method
router.all(['/', '/login', '/:id', '/:id/password', '/:id/photo', '/forgot_password', '/password_verification'], (req, res, next) => {
	response.sendMethodNotAllowed(res)
})

module.exports = router
