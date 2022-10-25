const { Worker } = require("worker_threads")
const path = require('path')

exports.create = async(data = {}) => {

    return new Promise((resolve, reject) => {

        const workerFile = path.dirname(require.main.filename) + '/api/helpers/worker.js';
     
        const worker = new Worker(workerFile, { workerData: data });
       
        worker.on("message", resolve)
        worker.on("error", reject);
        worker.on("exit", code => {
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });
}
