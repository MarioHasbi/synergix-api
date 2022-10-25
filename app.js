const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser')
const config = require('./api/config/index')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const SwaggerUi = require('swagger-ui-express')
const apiDoc = require('./ApiDoc.json')
// const path = require('path')
const rfs = require('rotating-file-stream')
const router = require('./api/routes')
const logger = require('./api/helpers/logger')
// test coment
// parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// for parsing application/json
app.use(bodyParser.json())
// for parsing multipart/form-data
app.use(express.static(config.publicDir))

// create a write stream (in append mode)
// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'request.log'), { flags: 'a' })
// create a rotating write stream
logger.setRequest(app); 
// setup the logger


const corsOptions = {
    origin: ['http://192.168.3.98:8080','http://192.168.3.170:8080'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

app.use(cookieParser(config.cookieSecret))


// setup swagger-ui  
var options = {
    swaggerOptions: {
        validatorUrl: null,
        filter: true,
    },
    customCss: `.swagger-ui .topbar { display: none }`,
};
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(apiDoc, options))
app.use('/downloads',express.static(`${config.folderNameReport}`));
app.use('/download_voice',express.static(`${config.folderNameVoice}`));
app.use('/download_info',express.static(`${config.infoAttachmentDir}`));
// define all router
app.use(router)

app.listen(config.port, (err) => {
    if (err) {
        console.error(`server error`)
    } else {
        console.log(`App is up and running for ${config.env} environment | PORT: ${config.port}`)
    }
})
