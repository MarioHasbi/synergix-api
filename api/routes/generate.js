const express = require('express')
const Controller = require('../controller/generate')
const response = require('../helpers/response')
const router = express.Router()
const validationMiddleware = require('../middleware/validation')

router.get('/report-call-activity', async (req, res, next) => {
    const conditions = req.query
    const generate = await Controller.generateReport(conditions,"1") 
    if (generate === null) {
        return response.sendBadRequest(res, 'Invalid Data')
    }
    const result = {
        total_data: 1 ,
        data: {
            url: "https://"+req.headers.host + generate.data.url,
            filename: generate.data.filename
        }
    }
    return response.sendSuccessData(res, result)
})

router.get('/report-performance', async (req, res, next) => {
    const conditions = req.query
    const generate = await Controller.generateReport(conditions,"2") 
    if (generate === null) {
        return response.sendBadRequest(res, 'Invalid Data')
    }
    const result = {
        total_data: 1 ,
        data: {
            url: "https://"+req.headers.host + generate.data.url,
            filename: generate.data.filename
        }
    }
    return response.sendSuccessData(res, result)
})


router.get('/report-call-customer', async (req, res) => {
    const conditions = req.query
    const generate = await Controller.generateReport(conditions,"3") 
    if (generate === null) {
        return response.sendBadRequest(res, 'Invalid Data')
    }
   
    const result = {
        total_data: 1 ,
        data: {
            url: "https://"+req.headers.host + generate.data.url,
            filename: generate.data.filename
        }
    }
    return response.sendSuccessData(res, result)
})

router.get('/report-bussiness-achivement', async (req, res) => {
    const conditions = req.query
    const generate = await Controller.generateReport(conditions,"4") 
    if (generate === null) {
        return response.sendBadRequest(res, 'Invalid Data')
    }
    const result = {
        total_data: 1 ,
        data: {
            url: "https://"+req.headers.host + generate.data.url,
            filename: generate.data.filename
        }
    }
    return response.sendSuccessData(res, result)
})

router.get('/report-cost-viewer', async (req, res) => {
    const conditions = req.query
    const generate = await Controller.generateReport(conditions,"5") 
    if (generate === null) {
        return response.sendBadRequest(res, 'Invalid Data')
    }
    const result = {
        total_data: 1 ,
        data: {
            url: "https://"+req.headers.host + generate.data.url,
            filename: generate.data.filename
        }
    }
    return response.sendSuccessData(res, result)
})

router.get('/export-qa-details', async (req, res) => {
    const conditions = req.query
    const generate = await Controller.generateReport(conditions,"6") 
    if (generate === null) {
        return response.sendBadRequest(res, 'Invalid Data')
    }
    const result = {
        total_data: 1 ,
        data: {
            url: "https://"+req.headers.host + generate.data.url,
            filename: generate.data.filename
        }
    }
    return response.sendSuccessData(res, result)
})

router.get('/report-qa-summaries', async (req, res) => {
    const conditions = req.query
    const generate = await Controller.generateReport(conditions,"7") 
    if (generate === null) {
        return response.sendBadRequest(res, 'Invalid Data')
    }
    const result = {
        total_data: 1 ,
        data: {
            url: "https://"+req.headers.host + generate.data.url,
            filename: generate.data.filename
        }
    }
    return response.sendSuccessData(res, result)
})
router.get('/report-emails', async (req, res) => {
    const conditions = req.query
    const generate = await Controller.generateReport(conditions,"8") 
    if (generate === null) {
        return response.sendBadRequest(res, 'Invalid Data')
    }
    const result = {
        total_data: 1 ,
        data: {
            url: "https://"+req.headers.host + generate.data.url,
            filename: generate.data.filename
        }
    }
    return response.sendSuccessData(res, result)
})

router.get('/report-break', async (req, res) => {
    const conditions = req.query
    const generate = await Controller.generateReport(conditions,"9") 
    if (generate === null) {
        return response.sendBadRequest(res, 'Invalid Data')
    }
    const result = {
        total_data: 1 ,
        data: {
            url: "https://"+req.headers.host + generate.data.url,
            filename: generate.data.filename
        }
    }
    return response.sendSuccessData(res, result)
})

router.get('/report-checker', async (req, res) => {
    const conditions = req.query
    const generate = await Controller.generateReport(conditions,"10") 
    if (generate === null) {
        return response.sendBadRequest(res, 'Invalid Data')
    }
    const result = {
        total_data: 1 ,
        data: {
            url: "https://"+req.headers.host + generate.data.url,
            filename: generate.data.filename
        }
    }
    return response.sendSuccessData(res, result)
})

router.get('/report-call-details', async (req, res) => {
    const conditions = req.query
    const generate = await Controller.generateReport(conditions,"11") 
    if (generate === null) {
        return response.sendBadRequest(res, 'Invalid Data')
    }
    const result = {
        total_data: 1 ,
        data: {
            url: "https://"+req.headers.host + generate.data.url,
            filename: generate.data.filename
        }
    }
    return response.sendSuccessData(res, result)
})
module.exports = router