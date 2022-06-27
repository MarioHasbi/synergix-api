const { key, key_refresh, algorithm, live, expire, expire_refresh } = require('../config/index').jwt
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const response = require('../helpers/response')
const redisHelper = require('../helpers/redis')
const { redis } = require('../config/index')
const dbQueryHelper = require('../helpers/db_query')
const cookieConfig = require('../config/cookie')

/**
 * Verify JWT token
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 * @param  {Object} next - Express next method
 */
exports.authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
        const headerToken = authHeader.split(' ')[1]

        const { signedCookies } = req
        const { xtoken } = signedCookies
        const ytoken = req.cookies.ytoken || null
        const socketAuth = req.cookies.socketAuth || null
        const user_id = req.cookies.user_id || 0
        const username = req.cookies.username || false
        const user_level_id = req.cookies.user_level_id
        const ext = req.cookies.ext
        console.log('ytoken: ', ytoken);

        // check if yToken exist
        if (ytoken === null) {
            return response.sendUnauthorized(res)
        }

        // check if yToken equals headerToken
        if (ytoken !== headerToken) {
            return response.sendUnauthorized(res)
        }

        const fullToken = `${xtoken}.${ytoken}`
        jwt.verify(fullToken, key, (err, decoded) => {
            if (err) {
                return response.sendUnauthorized(res)
            }
            req.decoded = decoded
        })

        res.cookie('ytoken', ytoken, cookieConfig.user_cookie_option)
        res.cookie('socketAuth', socketAuth, cookieConfig.user_cookie_option)
        //res.cookie('xtoken', xToken, cookieConfig.cookie_option)    
        res.cookie('user_id', user_id, cookieConfig.user_cookie_option)   
        res.cookie('username', username, cookieConfig.user_cookie_option)
        res.cookie('user_level_id', user_level_id, cookieConfig.user_cookie_option)
        res.cookie('ext', ext, cookieConfig.user_cookie_option)

        next()



        /*
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                return response.sendUnauthorized(res)
            }

            req.decoded = decoded
            next()
        })
        */



    } else {
        return response.sendForbidden(res)
    }
}

/**
 * Verify JWT refresh token
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 * @param  {Object} next - Express next method
 */
exports.authenticateJWTRefresh = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(' ')[1]

        jwt.verify(token, key_refresh, async (err, decoded) => {
            if (err) {
                return response.sendUnauthorized(res)
            }

            req.decoded = decoded
            const userId = decoded.id
            const userAgent = _.replace(decoded.user_agent, ' ', '')

            // get refresh token list
            if (redis.serviceStatus == 1) { // using redis
                const getCache = await redisHelper.getData({ key: `RefreshToken:${userId}:${userAgent}`, field: 'token' })

                if (getCache != token) {
                    return response.sendUnauthorized(res)
                }
            } else { // using database
                const table = 'refresh_tokens'
                const conditions = { user_id: userId, user_agent: userAgent, is_active: 1 }
                const result = await dbQueryHelper.getDetail({ table, conditions })

                if (result.data === false || result.data.token != token) {
                    return response.sendUnauthorized(res)
                }
            }

            next()
        })
    } else {
        return response.sendForbidden(res)
    }
}
