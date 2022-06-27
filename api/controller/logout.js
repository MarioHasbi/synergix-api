
const axios = require('axios').default;
const config = require('../config/index')
exports.logout = async (data) => {
    const queueMemberResponse = []
    let promises = [];
    if (Object.entries(data).length > 0) {
        for (const key in data) {
            const { queue, extension } = data[key]
            promises.push(
                 axios.put(`${config.ami.baseUrl}/queues/${queue}/members`, {
                    extension: extension,
                    action: "remove"
                }).then((results) => {
                    const { actionid, response, message } = results.data.data
                    queueMemberResponse.push({
                        ext: extension,
                        queue: queue,
                        actionid: actionid,
                        response: response,
                        message: message
                    })
                }))
        }
        return Promise.all(promises).then(() => {
            return queueMemberResponse
        })
        
    }else{
        return {}
    }
   
};
