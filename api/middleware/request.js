const response = require('../helpers/response')

/**
 * Check wether request is json or not
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 * @param  {Object} next - Express next method
 */
exports.jsonContent = (req, res, next) => {
	res.header("X-Frame-Options", "DENY");
	if (req.headers['content-type'] !== 'application/json') {
		return response.sendBadRequest(res, 'Json data is required')
	} 
	
	next()
}
