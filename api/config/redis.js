const redis = require('redis')
const redisConfig = require('../config/index').redis
const redisOptions = {
    host: redisConfig.host,
    port: redisConfig.port,
	db: redisConfig.db,
	enable_offline_queue: false
}
const redisExpire = redisConfig.expire // in seconds
let redisStatus = true

if (redisConfig.serviceStatus == 1) {
    const redisClient = redis.createClient(redisOptions);

    // redis error event
    redisClient.on('error', function (err) {
        console.error(`Redis error: ${err}`)
        redisStatus = false;
        exports.redisStatus = redisStatus
    })

    // redis connect event
    redisClient.on('connect', function () {
        console.log('Redis connected!');
        redisStatus = true;
        exports.redisStatus = redisStatus
    })

    redisClient.on('reconnecting', function () {
        console.log('Redis reconnecting ...');
        redisStatus = false;
        exports.redisStatus = redisStatus
    })
    
    exports.redisClient = redisClient
}

exports.redisExpire = redisExpire
exports.redisStatus = redisStatus
