const config = require('../config/index')
const axios = require('axios').default;


exports.dtmf = async (dataParam) => {

    const dtmfResponse = []
    let promises = [];

    promises.push(
        axios.post(`${config.ami.baseUrl}/dtmf`, dataParam
        ).then((results) => {

            const { actionid, response, message } = results.data.data
            dtmfResponse.push({
                channel: dataParam.channel,
                digit: dataParam.digit,
                actionid: actionid,
                response: response,
                message: message
            })
        }))
    

    return Promise.all(promises).then(() => {
        return dtmfResponse
    })
}
