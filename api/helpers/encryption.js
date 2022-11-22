const crypto = require('crypto')
const initVector = 'initVector16Bits'
const key = 'SYN3RG1XS0LUT10N5Y5T3MBYDEVJSM1D'
const algorithm = 'aes-256-cbc' //Using AES encryption

//Encrypting text
exports.encrypt = (text) => {
    const enKey = crypto.createCipheriv(algorithm, Buffer.from(key), initVector)
    let encryptedString = enKey.update(text, 'utf8', 'hex')
    encryptedString += enKey.final('hex')

    return encryptedString
}
 
 // Decrypting text
exports.decrypt = (text) => {
    const decKey = crypto.createDecipheriv(algorithm, Buffer.from(key), initVector);
	let decrypted = decKey.update(text, 'hex', 'utf8')
	decrypted += decKey.final('utf8')

    return decrypted
}
