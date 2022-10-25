const { workerData, parentPort } = require("worker_threads");
const report = require("./excel_generator");
const run = async (wData) => {
  const { task } = wData;
  let data;
  switch (task) {
    case "export-report":
      data = await createExcelWorker(wData);
      break;
    case "export-report-qa":
      data = await createExcelWorkerQA(wData);
      break;
    default:
      break;
  }
  
  parentPort.postMessage({ data });
};



async function createExcelWorker(wData) {
   
  const { header, data_report, fileName, dates, timeColumn, tableLine, title, mergeCells } = wData; 

 
  //const {reportType, columnData, rowData} = wData
  // const result = await report.excel_generator({reportType, columnData, rowData})
  const result = await report.excel_generator(header, data_report, fileName, dates, timeColumn, tableLine, title, mergeCells);
  console.log(result);
  return result;
}

async function createExcelWorkerQA(wData) {
    const { header, data, fileName } = wData;
    //const {reportType, columnData, rowData} = wData
    // const result = await report.excel_generator({reportType, columnData, rowData})
    const result = await report.excel_generator_qa({ header, data, fileName });
    return result?.data;
  }
run(workerData);
