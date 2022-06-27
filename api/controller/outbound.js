const config = require('../config/index')
const axios = require('axios').default;


exports.dial = (dataParam) => {
    return new Promise((resolve, reject) => {
        axios.post(`${config.ami.baseUrl}/outbound/dial`, dataParam)
            .then((results) => {
                const {response, message } = results.data.data
                const result = {
                    channel: dataParam.channel,
                    destination: dataParam.destination,
                    actionid: dataParam.actionid,
                    response: response,
                    message: message
                }
                resolve(result);
            }).catch((error) => {
                resolve(error);
            });
    });
}

exports.hangup = async (dataParam) => {
    return new Promise((resolve, reject) => {
        axios.post(`${config.ami.baseUrl}/outbound/hangup`, dataParam)
            .then((results) => {
                const { actionid, response, message } = results.data.data
                const result = {
                    channel: dataParam.channel,
                    destination: dataParam.destination,
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
