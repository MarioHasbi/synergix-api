const express = require('express')
const Controller = require('../controller/voices')
const response = require('../helpers/response')
const router = express.Router()

router.get('/', async (req, res, next) => {
    const conditions = req.query

    const voice_data = await Controller.playVoice(conditions) 
    if (voice_data.status === false) {
        return response.sendBadRequest(res, 'Invalid Data')
    }
    const result = {
        data: {
            url: "http://" + req.headers.host + voice_data.url,
            filename: voice_data.filename
        }
    }
    return response.sendSuccessData(res, result)
})
 

// for existing endpoint with other request method
router.all(['/', '/:id'], (req, res, next) => {
	response.sendMethodNotAllowed(res)
})

module.exports = router