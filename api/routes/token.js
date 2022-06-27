const authController = require('../controller/auth')
const bcrypt = require('bcrypt')
const express = require('express')
const responses = require('../helpers/response')
const router = express.Router()
const usersController = require('../controller/users')
const queueMembersController = require('../controller/queue_members')
const extensionController = require('../controller/extensions')
const userSchema = require('../schema/users')
const validationMiddleware = require('../middleware/validation')

// router.post('/', validationMiddleware(userSchema.login, 'body'), async (req, res) => {
//     let dataParam = req.body
//     let queueMemberResponseAdd = []
//     let queueMemberPauseResponse = []
//     const password = dataParam.password
//     const extension = dataParam.extension
//     const extCondition = { ext_no: extension }
//     //delete dataParam.password
//     const userCondition = {
//         username: dataParam.username
//     }
//     // get user by username
//     const user = await usersController.getDetail(userCondition)

//     if (user.data === false) {
//         return responses.sendDataNotFound(res, user)
//     }

//     // check password
//     if (!bcrypt.compareSync(password, user.data.password)) {
//         return responses.sendDataNotFound(res, user)
//     }
//     if (typeof extension !== undefined && extension) {
//         const getQueueMember = await queueMembersController.getAll({ extension: extension })
//         const getExt = await extensionController.getDetail({ ext_no: extension })
//         if (Object.entries(getQueueMember.data).length > 0) {
//             if (getExt.data.user_id == null || getExt.data.user_id == user.data.id || getExt.data.user_id == 0) {
//                 queueMemberResponseAdd = await queueMembersController.AmiAddQueueMembers(getQueueMember.data)
//                 queueMemberPauseResponse = await queueMembersController.AmiPauseQueueMembers(getQueueMember.data, false)
//                 await extensionController.updateData({ user_id: user.data.id }, extCondition)
//                 await usersController.updateData({ user_activity_id: 2 }, { id: user.data.id })
//             } else {
//                 return responses.sendMsgNotFound(res, 'Extension is already use by another ')
//             }
//         } else {
//             return responses.sendMsgNotFound(res, 'Extension Not Found')
//         }
//     } else {
//         await extensionController.updateData({ user_id: user.data.id }, extCondition)
//         await usersController.updateData({ user_activity_id: 3 }, { id: user.data.id })
//     }

//     let data = {
//         id: user.data.id || 0,
//         username: dataParam.username || false,
//         user_level_id: user.data.user_level_id || 0,
//         ip: req.connection.remoteAddress,
//         user_agent: req.headers['user-agent'],
//         queue_members_add: queueMemberResponseAdd,
//         queue_members_pause: queueMemberPauseResponse
//     }
//     // Generate an access token
//     const createToken = await authController.createToken(data)
//     return responses.sendSuccessData(res, createToken)
// })

router.post('/', validationMiddleware(userSchema.login, 'body'), async (req, res) => {
    let dataParam = req.body

    const password = dataParam.password
    
    //delete dataParam.password
    const userCondition = {
        username: dataParam.username
    }
    // get user by username
    const user = await usersController.getDetail(userCondition)

    if (user.data === false) {
        return responses.sendDataNotFound(res, user)
    }

    // check password
    if (!bcrypt.compareSync(password, user.data.password)) {
        return responses.sendDataNotFound(res, user)
    }

    let data = {
        id: user.data.id || 0,
        username: dataParam.username || false,
        user_level_id: user.data.user_level_id || 0,
        ip: req.connection.remoteAddress,
        user_agent: req.headers['user-agent'],

    }
    // Generate an access token
    const createToken = await authController.createToken(data)
    return responses.sendSuccessData(res, createToken)
})

router.post('/reload', validationMiddleware(userSchema.login, 'body'), async (req, res) => {
    let dataParam = req.body

    const password = dataParam.password
    
    //delete dataParam.password
    const userCondition = {
        username: dataParam.username
    }
    // get user by username
    const user = await usersController.getDetail(userCondition)

    if (user.data === false) {
        return responses.sendDataNotFound(res, user)
    }

    // check password
    if (!bcrypt.compareSync(password, user.data.password)) {
        return responses.sendDataNotFound(res, user)
    }

    let data = {
        id: user.data.id || 0,
        username: dataParam.username || false,
        user_level_id: user.data.user_level_id || 0,
        ip: req.connection.remoteAddress,
        user_agent: req.headers['user-agent'],

    }
    // Generate an access token
    const createToken = await authController.createToken(data)
    return responses.sendSuccessData(res, createToken)
})

router.post('/refresh-old', async (req, res) => {
    // read id and username from request token
    let dataParam = {
        id: req.decoded.id,
        username: req.decoded.username
    }
    let ip = req.decoded.ip
    let userAgent = req.decoded.user_agent

    if (ip != req.connection.remoteAddress || userAgent != req.headers['user-agent']) {
        return responses.sendUnauthorized(res)
    }

    // filter user from given data
    const user = await usersController.getDetail(dataParam)

    if (user.data === false) {
        return responses.sendDataNotFound(res, user)
    }

    let data = {
        id: user.data.id || 0,
        username: dataParam.username || false,
        user_level_id: user.data.user_level_id || 0,
        ip: req.connection.remoteAddress,
        user_agent: req.headers['user-agent']
    }
    // Generate an access token
    const createToken = await authController.createToken(data)

    return responses.sendSuccessData(res, createToken)
})

router.post('/refresh', async (req, res) => {
    // read id and username from request token
    const dataParam = {
        id: req.decoded.id,
        username: req.decoded.username
    }
    const ip = req.decoded.ip
    const userAgent = req.decoded.user_agent

    if (userAgent != req.headers['user-agent']) {
        return responses.sendUnauthorized(res)
    }

    // filter user from given data
    const user = await usersController.getDetail(dataParam)

    if (user.data === false) {
        return response.sendDataNotFound(res, user)
    }

    const data = {
        id: user.data.id || 0,
        username: dataParam.username || false,
        user_level_id: user.data.user_level_id || 0,
        ip: req.connection.remoteAddress,
        user_agent: req.headers['user-agent']
    }
    // Generate an access token
    const createToken = await authController.createToken(data)

    return responses.sendSuccessData(res, createToken)
})

router.delete('/refresh', async (req, res) => {
    // read id and username from request token
    let dataParam = {
        id: req.decoded.id,
        username: req.decoded.username
    }
    let ip = req.decoded.ip
    let userAgent = req.decoded.user_agent

    if (userAgent != req.headers['user-agent']) {
        return responses.sendUnauthorized(res)
    }

    // filter user from given data
    const user = await usersController.getDetail(dataParam)

    if (user.data === false) {
        return responses.sendDataNotFound(res, user)
    }

    let data = {
        id: user.data.id || 0,
        username: dataParam.username || false,
        user_level_id: user.data.user_level_id || 0,
        ip: req.connection.remoteAddress,
        user_agent: req.headers['user-agent']
    }

    // kill refresh token (remove from redis, set is_active 0 to database)

    // Generate an access token
    const createToken = await authController.createToken(data)

    return responses.sendSuccessData(res, createToken)
})

// for existing endpoint with other request method
router.all(['/', '/refresh'], (req, res) => {
    responses.sendMethodNotAllowed(res)
})

module.exports = router
