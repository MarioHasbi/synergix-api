const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const config = require("./api/config/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const SwaggerUi = require("swagger-ui-express");
const apiDoc = require("./ApiDoc.json");
// const path = require('path')
const rfs = require("rotating-file-stream");
const router = require("./api/routes");
const logger = require("./api/helpers/logger");
const helmet = require("helmet");

app.use(helmet());

app.use(
  helmet.hsts({
    maxAge: 24 * 60 * 60 * 1000,
    includeSubDomains: false,
  })
);

app.use(
  helmet.frameguard({
    action: "deny",
  })
);

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// test coment
// parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing application/json
app.use(bodyParser.json());
// for parsing multipart/form-data
app.use(express.static(config.publicDir));

// create a write stream (in append mode)
// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'request.log'), { flags: 'a' })
// create a rotating write stream
// const accessLogStream = rfs.createStream('request.log', {
//     interval: '1d', // rotate daily
//     path: config.logDir
// })
// // setup the logger
// app.use(morgan('combined', { stream: accessLogStream }))

logger.setRequest(app);

const corsOptions = {
  origin: ['http://172.18.129.196:8080','http://172.18.129.197:8080','https://telesales.dev.bri.co.id','https://telesales-api.dev.bri.co.id'],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(cookieParser(config.cookieSecret));

// setup swagger-ui
var options = {
  swaggerOptions: {
    validatorUrl: null,
    filter: true,
  },
  customCss: `.swagger-ui .topbar { display: none }`,
};
app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(apiDoc, options));
app.use("/downloads", express.static(`${config.folderNameReport}`));
app.use("/download_voice", express.static(`${config.folderNameVoice}`));
app.use("/download_info", express.static(`${config.infoAttachmentDir}`));
// define all router
app.use(router);

app.listen(config.port, (err) => {
  if (err) {
    console.error(`server error`);
  } else {
    console.log(
      `App is up and running for ${config.env} environment | PORT: ${config.port}`
    );
  }
});
