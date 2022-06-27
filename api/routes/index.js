const _ = require('lodash')
const authMiddleware = require('../middleware/auth')
const config = require('../config')
const express = require('express')
const fs = require('fs')
const path = require('path')
const publicPath = ['/token', '/token/refresh', '/users/login', '/users/forgot_password', '/users/password_verification', '/users/email_verification', '/emails/forgot_password', /^\/users\/verification_code\/([^\/]*)$/, /^\/users\/password_verification\/([^\/]*)$/]
const refreshTokenPath = ['/token/refresh']
const response = require('../helpers/response')
const routePath = './api/routes/'
const router = express.Router()
const scriptName = path.basename(__filename)

function matchInArray(string, expressions) {
    const len = expressions.length

    for (i=0; i<len; i++) {
        if (string.match(expressions[i])) {
            return true
        }
    }

    return false
}

const unlessPath = (path = [], middleware) => {
    return function(req, res, next) {
        const insideRegex = matchInArray(req.path, path)

        if (_.indexOf(path, req.path) >= 0 || insideRegex) {
            return next()
        } else {
            return middleware(req, res, next)
        }
    }
}

const unlessPathRefresh = (path = [], middleware) => {
    return function(req, res, next) {
        if (_.indexOf(path, req.path) >= 0) {
            return middleware(req, res, next)
        } else {
            return next()
        }
    }
}

router.get('/', (req, res) => {
    res.send({app: 'Synergix API'})
})

// enable auth middleware except for some routes
router.use(unlessPathRefresh(refreshTokenPath, authMiddleware.authenticateJWTRefresh))
router.use(unlessPath(publicPath, authMiddleware.authenticateJWT))

fs.readdirSync(routePath).forEach(function (file) {
    // not including this file
    if (file != scriptName) {
        // get only filename, cut the file format (.js)
        const name = file.split('.')[0]
        router.use(`/${name}`, require(`./${name}`))
    }
})

// for non-existing route
router.all('*', (req, res) => {
    response.sendNotFound(res)
})

// for production
if (config.env == 'production') {
    // override error
    router.use((error, req, res, next) => {
        if (error instanceof SyntaxError) { // Handle SyntaxError here.
            return response.sendBadRequest(res, 'Data Not Valid')
        }

        console.error(error.stack)
        response.sendInternalServerError(res)
    })
}

module.exports = router
