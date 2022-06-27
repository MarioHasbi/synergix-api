const config = require('./index')
const mysql = require('mysql');
/* const pool = mysql.createPool({
    connectionLimit: 10,
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.name ,
}) */
const dbConn = mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.name,
    multipleStatements: true,
    dateStrings: true // Force date types (TIMESTAMP, DATETIME, DATE) to be returned as strings rather then inflated into JavaScript Date objects. (Default: false)
})

/* function conn() {
    return pool
}
conn().getConnection(function (err) {
    if (err) throw err;
}) */

dbConn.connect((err) => {
    if (err) throw err;
})

module.exports = dbConn
