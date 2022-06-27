const config = require('../config/index')
const axios = require('axios').default;


exports.pickup = async (dataParam) => {

    const pickupResponse = []
    let promises = [];

    promises.push(
        axios.post(`${config.ami.baseUrl}/pickup`, dataParam
        ).then((results) => {

            const { actionid, response, message } = results.data.data
            pickupResponse.push({
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
        return pickupResponse
    })
}
