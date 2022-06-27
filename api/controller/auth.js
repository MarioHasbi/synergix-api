const { key, key_refresh, algorithm, live, expire, expire_refresh } = require('../config/index').jwt
const _ = require('lodash')
const dateFormat = require('dateformat')
const jwt = require('jsonwebtoken')
const ms = require('ms')
const redisHelper = require('../helpers/redis')
const { redis } = require('../config/index')
const dbQueryHelper = require('../helpers/db_query')

const refreshToken = (data = { 'id': '', 'username': '', 'ip': '', 'user_agent': '' }) => {
    return new Promise((resolve, reject) => {
        let now = new Date()
        let expireMilSeconds = ms(expire_refresh)
        let expireSeconds = Math.floor(expireMilSeconds / 1000)
        // add jwt expire
        let addExpireSeconds = now.getSeconds() + _.toInteger(expireSeconds)
        now.setSeconds(addExpireSeconds)
        let timestamp = now.getTime()
        let expireDate = dateFormat(timestamp, 'yyyy-mm-dd HH:MM:ss')
        const options = {
            expiresIn: expire_refresh
        }

        jwt.sign(data, key_refresh, options, async (err, token) => {
            if (err) {
                return resolve(res)
            }

            let res = {
                token,
                expireDate
            }
            const userId = data.id
            const userAgent = _.replace(data.user_agent, ' ', '')

            // register refresh token
            if (redis.serviceStatus == 1) { // using redis
                redisHelper.setData({ key: `RefreshToken:${userId}:${userAgent}`, field: 'token', data: token, expire: expireSeconds })
            } else { // using database
                const dataToken = [
                    { 
                        user_id: userId, 
                        user_agent: userAgent, 
                        token: token, 
                        is_active: 1, 
                        expired: expireDate
                    }
                ]
                const result = await dbQueryHelper.insertDuplicateUpdateData({table: 'refresh_tokens', data: dataToken})

                if (result.data === false) {
                    res = {
                        token: '',
                        expireDate: ''
                    }
                }
            }

            return resolve(res)
        })
    })
}

exports.createToken = (data = { 'id': '', 'username': '','user_level_id':'', 'ip': '', 'user_agent': '' }) => {
    return new Promise(async (resolve, reject) => { 
        let res = {
            total_data: 0,
            data: false
        }
        let now = new Date()
        let expireMilSeconds = ms(expire)
        let expireSeconds = Math.floor(expireMilSeconds / 1000)
        // add jwt expire
        let addExpireSeconds = now.getSeconds() + _.toInteger(expireSeconds)
        now.setSeconds(addExpireSeconds)
        let timestamp = now.getTime()
        let expireDate = dateFormat(timestamp, 'yyyy-mm-dd HH:MM:ss')
        //const refresh = await refreshToken(data)

        jwt.sign(data, key, { expiresIn: expire }, (err, token) => {
            if (err) {
                return resolve(res)
            }

            data.token = token
            data.token_expires_in = expireDate
            //data.refresh_token = refresh.token
            //data.refresh_token_expires_in = refresh.expireDate

            delete data.ip
            delete data.user_agent
            res = {
                total_data: 1,
                limit: 0,
                page: 1,
                data: data
            }
            resolve(res)
        })
    })
}

exports.removeRefreshToken = (data = { 'id': '', 'username': '', 'ip': '', 'user_agent': '' }) => {
    return new Promise(async (resolve, reject) => {
        let res = {
            total_data: 0,
            data: false
        }
        let now = new Date()
        let expireMilSeconds = ms(expire)
        let expireSeconds = Math.floor(expireMilSeconds / 1000)
        // add jwt expire
        let addExpireSeconds = now.getSeconds() + _.toInteger(expireSeconds)
        now.setSeconds(addExpireSeconds)
        let timestamp = now.getTime()
        let expireDate = dateFormat(timestamp, 'yyyy-mm-dd HH:MM:ss')

        // remove token in redis / for db, set column is_active = 0 in table refresh_tokens
        
        jwt.sign(data, key, { expiresIn: expire }, (err, token) => {
            if (err) {
                return resolve(res)
            }

            data.token = token
            data.token_expires_in = expireDate

            delete data.id
            delete data.ip
            delete data.user_agent

            res = {
                total_data: 1,
                limit: 0,
                page: 1,
                data: data
            }
            resolve(res)
        })
    })
}
