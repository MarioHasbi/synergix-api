const config = require('../config/index')
const axios = require('axios').default;


exports.whisper = async (dataParam) => {

    const whisperResponse = []
    let promises = [];

    promises.push(
        axios.post(`${config.ami.baseUrl}/whisper`, dataParam
        ).then((results) => {

            const { actionid, response, message } = results.data.data
            whisperResponse.push({
                source: dataParam.source,
                destination: dataParam.destination,
                actionid: actionid,
                response: response,
                message: message
            })
        }))
    

    return Promise.all(promises).then(() => {
        return whisperResponse
    })
}

exports.unwhisper = async (dataParam) => {
    return new Promise((resolve, reject) => {
        axios.post(`${config.ami.baseUrl}/whisper/unwhisper`, dataParam)
            .then((results) => {
                const { actionid, response, message } = results.data.data
                const result = {
                    channel: dataParam.channel,
                    
                    actionid: actionid,
                    response: response,
                    message: message
                }
                resolve(result);
            }).catch((error) => {
                resolve(error);
            });
    });

}