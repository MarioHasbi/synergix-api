const config = require('../config/index')
const axios = require('axios').default;


exports.transfer = async (dataParam) => {

    const transferResponse = []
    let promises = [];

    promises.push(
        axios.post(`${config.ami.baseUrl}/transfer`, dataParam
        ).then((results) => {

            const { actionid, response, message } = results.data.data
            transferResponse.push({
                channel: dataParam.channel,
                destination: dataParam.destination,
                phone_number : dataParam.phone_number,
                username : dataParam.username,
                actionid: actionid,
                response: response,
                message: message
            })
        }))
    

    return Promise.all(promises).then(() => {
        return transferResponse
    })
}
