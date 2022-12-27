const config = require('./index')

exports.cookie_option = { 
    httpOnly: true, 
    domain: config.cookieDomain,
    //sameSite: true,
    signed: true, 
    //secure:  process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'  
}

exports.user_cookie_option = {
    httpOnly: false,
    domain: config.cookieDomain,
    maxAge: 24 * 60 * 60 * 1000,
    //secure:  process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'  
}