const config = require('../config/index')
const axios = require('axios').default;


exports.listen = async (dataParam) => {

    const listenResponse = []
    let promises = [];

    promises.push(
        axios.post(`${config.ami.baseUrl}/listen`, dataParam
        ).then((results) => {

            const { actionid, response, message } = results.data.data
            listenResponse.push({
                source: dataParam.source,
                destination: dataParam.destination,
                actionid: actionid,
                response: response,
                message: message
            })
        }))
    

    return Promise.all(promises).then(() => {
        return listenResponse
    })
}

exports.unlisten = async (dataParam) => {
    return new Promise((resolve, reject) => {
        axios.post(`${config.ami.baseUrl}/listen/unlisten`, dataParam)
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
