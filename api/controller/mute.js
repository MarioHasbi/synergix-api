const config = require('../config/index')
const axios = require('axios').default;


exports.mute = async (dataParam) => {

    const muteResponse = []
    let promises = [];

    promises.push(
        axios.post(`${config.ami.baseUrl}/mute`, dataParam
        ).then((results) => {

            const { actionid, response, message } = results.data.data
            muteResponse.push({
                channel: dataParam.channel,
                direction: dataParam.direction,
                state:dataParam.state,
                actionid: actionid,
                response: response,
                message: message
            })
        }))
    

    return Promise.all(promises).then(() => {
        return muteResponse
    })
}
