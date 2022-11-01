const dateFormat = require("dateformat");
const excel = require("../helpers/excel_generator");

const callsController = require("../controller/calls");
const qa_detailsControler = require("../controller/quality_assurance_details");
const emailsControler = require("../controller/emails");
const breakssControler = require("../controller/break_histories");
const thread = require("../helpers/thread");

exports.generateReport = async (conditions, report = 0) => {
  let filename = "";
  let title = "";
  let generate = false;

  switch (report) {
    case "1":
      {
        dates =
          conditions.date !== undefined
            ? conditions.date
            : `${dateFormat(conditions.date, "yyyy-mm-dd")}`;
        title = "Report Call Activity";
        filename = "report-call-activity";
        const header = [
          { header: "No", key: "no" },
          { header: "Name", key: "username" },
          { header: "ID", key: "user_id" },
          { header: "Login Time", key: "login_time" },
          { header: "Logout Time", key: "logout_time" },
          { header: "Available Time", key: "available_duration" },
          { header: "Talk Time", key: "talk_time" },
          { header: "AUX Time - Rest Room", key: "rest_room" },
          { header: "AUX Time - Pray Time", key: "pray_time" },
          { header: "AUX Time - Coaching Time", key: "coaching_time" },
          { header: "Break Time", key: "break_time" },
        ];
        const { data } = await callsController.getReportCallActivity(
          conditions
        );
        const timeColumn = [6, 7, 8, 9, 10, 11];
        const tableLine = [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
        ];
        const mergeCells = "A1:K2";
        const data_report = data;

        const fileName = `${filename}-${dateFormat(
          conditions.date,
          "yyyy-mm-dd-HH-MM-ss"
        )}`;
        generate = await thread.create({
          task: "export-report",
          header,
          data_report,
          fileName,
          dates,
          timeColumn,
          tableLine,
          title,
          mergeCells,
        });

        return generate;
      }
      break;
    case "2":
      {
        if (conditions.start !== undefined) {
          dates =
            conditions.start +
            (conditions.end !== undefined ? " - " + conditions.end : "");
        } else if (conditions.date !== undefined) {
          dates = conditions.date;
        } else {
          dates = "ALL DATE";
        }
        title = "Report Performance";
        filename = "report-performance";

        const { data } = await callsController.getReportPerformanceAgent(
          conditions
        );
        const header = [
          { header: "No", key: "no" },
          { header: "Agent", key: "agent" },
          { header: "Campaign Name", key: "campaign_name" },
          { header: "Customer Name", key: "customer_name" },
          { header: "Phone 1", key: "phone_1" },
          { header: "Phone 2", key: "phone_2" },
          { header: "Email", key: "email" },
          { header: "Card Number", key: "card_number" },
          { header: "Card Type", key: "card_type" },
          { header: "Limit", key: "limits" },
          { header: "Tenor", key: "tenor" },
          { header: "Card Since Year", key: "card_since_year" },
          { header: "Card Since Month", key: "card_since_month" },
          { header: "Card Exp Date", key: "card_exp_date" },
          { header: "Card Emboss Name", key: "card_emboss_name" },
          { header: "Amount", key: "amount" },
          { header: "Account No", key: "account_no" },
          { header: "Bank Interest", key: "bank_interest" },
          { header: "Bank Name", key: "bank_name" },
          { header: "Mother Name", key: "mother_name" },
          { header: "Age", key: "age" },
          { header: "Gender", key: "gender" },
          { header: "Birth Place", key: "birth_place" },
          { header: "Birth Date", key: "birth_date" },
          { header: "Merchant", key: "merchant" },
          { header: "Transaction Date", key: "transaction_date" },
          { header: "Home Address", key: "home_address" },
          { header: "Home City", key: "home_city" },
          { header: "Home Zip", key: "home_zip" },
          { header: "Office Address", key: "office_address" },
          { header: "Office City", key: "office_city" },
          { header: "Office Zip", key: "office_zip" },
          { header: "Income", key: "income" },
          { header: "Business Type", key: "business_type" },
          { header: "Occupation", key: "occupation" },
          { header: "KTP", key: "ktp" },
          { header: "NPWP", key: "npwp" },
        ];

        const data_report = data;

        const timeColumn = [];
        const tableLine = [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z",
          "AA",
          "AB",
          "AC",
          "AD",
          "AE",
          "AF",
          "AG",
          "AH",
          "AI",
          "AJ",
          "AK",
        ];
        const mergeCells = "A1:AK2";

        const fileName = `${filename}-${dateFormat(
          conditions.date,
          "yyyy-mm-dd-HH-MM-ss"
        )}`;
        generate = await thread.create({
          task: "export-report",
          header,
          data_report,
          fileName,
          dates,
          timeColumn,
          tableLine,
          title,
          mergeCells,
        });
        return generate;
      }
      break;
    case "3":
      {
        if (conditions.start !== undefined) {
          dates =
            conditions.start +
            (conditions.end !== undefined ? " - " + conditions.end : "");
        } else if (conditions.date !== undefined) {
          dates = conditions.date;
        } else {
          dates = `${dateFormat(conditions.date, "yyyy-mm-dd")}`;
        }
        title = "Report Call Customer";
        filename = "report-call-customer";

        const header = [
          { header: "No", key: "no" },
          { header: "Call Date/Time", key: "calldate" },
          { header: "Agent", key: "agent" },
          { header: "Agent Fullname", key: "agent_fullname" },
          { header: "Campaign Name", key: "campaign_name" },
          { header: "Customer", key: "customer_name" },
          { header: "Phone Number Type", key: "phone_number_type" },
          { header: "Phone Number", key: "phone_number" },
          { header: "Call Duration", key: "call_duration" },
          { header: "Notes", key: "notes" },
          { header: "Outbound Status", key: "outbound_status" },
          { header: "Outbound Category", key: "outbound_category" },
          {
            header: "Outbound Category Detail",
            key: "outbound_categoriy_detail",
          },
          { header: "Filename", key: "filename" },
          { header: "Host Address", key: "host_address" },
          { header: "Upload Filename", key: "upload_filename" },
        ];
        const { data } = await callsController.getReportCallCustomer(
          conditions
        );
        const data_report = data;

        const timeColumn = ["I"];
        const tableLine = [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
        ];
        const mergeCells = "A1:P2";

        //generate = await excel.excel_generator(header, data_report, `${filename}-${dateFormat(conditions.date, 'yyyy-mm-dd-HH-mm-ss')}`, dates, timeColumn, tableLine, title, mergeCells)
        const fileName = `${filename}-${dateFormat(
          conditions.date,
          "yyyy-mm-dd-HH-MM-ss"
        )}`;
        generate = await thread.create({
          task: "export-report",
          header,
          data_report,
          fileName,
          dates,
          timeColumn,
          tableLine,
          title,
          mergeCells,
        });

        return generate;
      }
      break;
    case "4":
      {
        dates =
          conditions.date !== undefined
            ? conditions.date
            : `${dateFormat(conditions.date, "yyyy-mm-dd")}`;
        title = "Report Bussines Achivement";
        filename = "report-bussiness-achivement";

        const header = [
          { header: "No", key: "no" },
          { header: "Name", key: "username" },
          { header: "Campaign Name", key: "campaign_name" },
          {
            header: "Number Customer Approved",
            key: "number_customer_approved",
          },
          { header: "Nominal", key: "nominal" },
          {
            header: "Average Customer Nominal Approved",
            key: "average_customer_nominal_approved",
          },
        ];
        const { data } = await callsController.getBussinesssAchivement(
          conditions
        );
        const data_report = data;

        const timeColumn = [];
        const tableLine = ["A", "B", "C", "D", "E", "F"];
        const mergeCells = "A1:F2";

        const fileName = `${filename}-${dateFormat(
          conditions.date,
          "yyyy-mm-dd-HH-MM-ss"
        )}`;
        generate = await thread.create({
          task: "export-report",
          header,
          data_report,
          fileName,
          dates,
          timeColumn,
          tableLine,
          title,
          mergeCells,
        });

        return generate;
      }
      break;
    case "5":
      {
        if (conditions.start !== undefined) {
          dates =
            conditions.start +
            (conditions.end !== undefined ? " - " + conditions.end : "");
        } else if (conditions.date !== undefined) {
          dates = conditions.date;
        } else {
          dates = `${dateFormat(conditions.date, "yyyy-mm-dd")}`;
        }
        title = "Report Cost Viewer";
        filename = "report-cost-viewer";

        const header = [
          { header: "No", key: "no" },
          { header: "Name", key: "name" },
          { header: "Number of Call", key: "number_of_call" },
          { header: "Duration", key: "durasi" },
          { header: "Predictive Cost Call", key: "predictive_call_cost" },
        ];
        const { data } = await callsController.getCallCost(conditions);
        const data_report = data;

        const timeColumn = [4];
        const tableLine = ["A", "B", "C", "D", "E"];
        const mergeCells = "A1:E2";

        const fileName = `${filename}-${dateFormat(
          conditions.date,
          "yyyy-mm-dd-HH-MM-ss"
        )}`;
        generate = await thread.create({
          task: "export-report",
          header,
          data_report,
          fileName,
          dates,
          timeColumn,
          tableLine,
          title,
          mergeCells,
        });

        return generate;
      }
      break;
    case "6":
      {
        const dates =
          conditions.date !== undefined
            ? conditions.date
            : `${dateFormat(conditions.date, "yyyy-mm-dd")}`;
        const header = [
          { header: "No", key: "no" },
          { header: "Aspek Callmon", key: "aspect_callmon" },
          { header: "Bobot", key: "bobot" },
          { header: "Hasil", key: "hasil" },
          { header: "Skor", key: "skor" },
        ];
        const { data } = await qa_detailsControler.getQADetails(conditions);

        const data_report = data;

        if (data_report.length > 0) {
          const qa_name = `${data_report[0].qa_name}`;
          const calldate = `${data_report[0].calldate}`;
          const durasi = `${data_report[0].durasi}`;
          const customer_name = `${data_report[0].customer_fullname}`;
          const card_number =
            `${data_report[0].card_number}` === "null"
              ? ""
              : data_report[0].card_number;
          const QA_by = `${data_report[0].QA_by}`;
          const agent = `${data_report[0].agent}`;
          const qa_notes =
            `${data_report[0].qa_notes}` === "null"
              ? ""
              : data_report[0].qa_notes;
          const periods = `${data_report[0].period_name}`;
          const total = `${data_report[0].total}`;

          title = "Callmon Telesales (" + qa_name + ")";
          filename = "export-" + qa_name + " - " + agent;
          const timeColumn = [];
          const tableLine = ["A", "B", "C", "D", "E"];
          const mergeCells = "A1:E2";
          const mergeCells2 = "A3:E3";

          const fileName = `${filename}-${dateFormat(
            dates,
            "yyyy-mm-dd-HH-MM-ss"
          )}`;
          generate = await thread.create({
            task: "export-report-qa",
            header,
            data_report,
            fileName,
            dates,
            timeColumn,
            tableLine,
            title,
            mergeCells,
            mergeCells2,
            calldate,
            durasi,
            customer_name,
            card_number,
            QA_by,
            agent,
            qa_notes,
            periods,
            total,
          });
         // generate = await excel.excel_generator_qa(header, data_report, fileName, timeColumn, tableLine, title, mergeCells, mergeCells2,   calldate, durasi, customer_name, card_number, QA_by, agent, qa_notes, periods, total)
          return generate;
        } else {
          return false;
        }
      }
      break;
    case "7":
      {
        if (conditions.start !== undefined) {
          dates =
            conditions.start +
            (conditions.end !== undefined ? " - " + conditions.end : "");
        } else if (conditions.date !== undefined) {
          dates = conditions.date;
        } else {
          dates = `${dateFormat(conditions.date, "yyyy-mm-dd")}`;
        }
        title = "Report QA Summaries";
        filename = "report-qa-summaries";

        const header = [
          { header: "No", key: "no" },
          { header: "Nama Agent", key: "username" },
          { header: "Periode 1", key: "period_1" },
          { header: "Periode 2", key: "period_2" },
          { header: "Periode 3", key: "period_3" },
          { header: "Periode 4", key: "period_4" },
          { header: "Periode 5", key: "period_5" },
          { header: "Periode 6", key: "period_6" },
          { header: "Periode 7", key: "period_7" },
          { header: "Periode 8", key: "period_8" },
          { header: "Periode 9", key: "period_9" },
          { header: "Periode 10", key: "period_10" },
        ];
        const { data } = await qa_detailsControler.getQASummaries(conditions);
        const data_report = data;

        const timeColumn = [];
        const tableLine = [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
        ];
        const mergeCells = "A1:L2";

        const fileName = `${filename}-${dateFormat(
          conditions.date,
          "yyyy-mm-dd-HH-MM-ss"
        )}`;
        generate = await thread.create({
          task: "export-report",
          header,
          data_report,
          fileName,
          dates,
          timeColumn,
          tableLine,
          title,
          mergeCells,
        });

        return generate;
      }
      break;
    case "8":
      {
        if (conditions.start !== undefined) {
          dates =
            conditions.start +
            (conditions.end !== undefined ? " - " + conditions.end : "");
        } else if (conditions.date !== undefined) {
          dates = conditions.date;
        } else {
          dates = `${dateFormat(conditions.date, "yyyy-mm-dd")}`;
        }
        title = "Report Emails";
        filename = "report-emails";

        const header = [
          { header: "No", key: "no" },
          { header: "Sent Date", key: "sent_date" },
          { header: "Receptient", key: "receptients" },
          { header: "Email Status", key: "email_status" },
          { header: "Campagin Name", key: "campaign_name" },
          { header: "Subject", key: "subject" },
          { header: "Content", key: "content" },
          { header: "Filename", key: "filename" },
        ];
        const { data } = await emailsControler.getReportEmails(conditions);
        const data_report = data;

        const timeColumn = [];
        const tableLine = ["A", "B", "C", "D", "E", "F", "G", "H"];
        const mergeCells = "A1:H2";

        const fileName = `${filename}-${dateFormat(
          conditions.date,
          "yyyy-mm-dd-HH-MM-ss"
        )}`;
        generate = await thread.create({
          task: "export-report",
          header,
          data_report,
          fileName,
          dates,
          timeColumn,
          tableLine,
          title,
          mergeCells,
        });

        return generate;
      }
      break;
    case "9":
      {
        if (conditions.start !== undefined) {
          dates =
            conditions.start +
            (conditions.end !== undefined ? " - " + conditions.end : "");
        } else if (conditions.date !== undefined) {
          dates = conditions.date;
        } else {
          dates = `${dateFormat(conditions.date, "yyyy-mm-dd")}`;
        }
        title = "Report Break";
        filename = "report-break";

        const header = [
          { header: "No", key: "no" },
          { header: "RecordID", key: "recordid" },
          { header: "Break Date", key: "break_date" },
          { header: "Break Time", key: "break_time" },
          { header: "Username", key: "username" },
          { header: "Break Reason", key: "break_reason" },
          { header: "Resume Date", key: "resume_date" },
          { header: "Resume Time", key: "resume_time" },
          { header: "Duration", key: "duration" },
          { header: "Total Break", key: "total_break" },
        ];
        const { data } = await breakssControler.getReportBreak(conditions);
        const data_report = data;

        const timeColumn = ["H", "I", "J"];
        const tableLine = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
        const mergeCells = "A1:J2";

        const fileName = `${filename}-${dateFormat(
          conditions.date,
          "yyyy-mm-dd-HH-MM-ss"
        )}`;
        generate = await thread.create({
          task: "export-report",
          header,
          data_report,
          fileName,
          dates,
          timeColumn,
          tableLine,
          title,
          mergeCells,
        });

        return generate;
      }
      break;
    case "10":
      {
        if (conditions.start !== undefined) {
          dates =
            conditions.start +
            (conditions.end !== undefined ? " - " + conditions.end : "");
        } else if (conditions.date !== undefined) {
          dates = conditions.date;
        } else {
          dates = `${dateFormat(conditions.date, "yyyy-mm-dd")}`;
        }
        title = "Report Checker";
        filename = "report-checker";

        const header = [
          { header: "No", key: "no" },
          { header: "Call Date/Time", key: "calldate" },
          { header: "Agent", key: "agent" },
          { header: "Agent Fullname", key: "agent_fullname" },
          { header: "Campaign Name", key: "campaign_name" },
          { header: "Customer", key: "customer_name" },
          { header: "Phone Number Type", key: "phone_number_type" },
          { header: "Phone Number", key: "phone_number" },
          { header: "Call Duration", key: "call_duration" },
          { header: "Notes", key: "notes" },
          { header: "Outbound Status", key: "outbound_status" },
          { header: "Outbound Category", key: "outbound_category" },
          {
            header: "Outbound Category Detail",
            key: "outbound_categoriy_detail",
          },
          { header: "Checking By", key: "checking_by" },
          { header: "Checking Reason", key: "checking_reason" },
          { header: "Checking Note", key: "checking_note" },
          { header: "Filename", key: "filename" },
          { header: "Host Address", key: "host_address" },
        ];
        const { data } = await callsController.getReportChecker(conditions);
        const data_report = data;

        const timeColumn = ["I"];
        const tableLine = [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
        ];
        const mergeCells = "A1:R2";

        const fileName = `${filename}-${dateFormat(
          conditions.date,
          "yyyy-mm-dd-HH-MM-ss"
        )}`;
        generate = await thread.create({
          task: "export-report",
          header,
          data_report,
          fileName,
          dates,
          timeColumn,
          tableLine,
          title,
          mergeCells,
        });

        return generate;
      }
      break;
    case "11":
      {
        if (conditions.start !== undefined) {
          dates =
            conditions.start +
            (conditions.end !== undefined ? " - " + conditions.end : "");
        } else if (conditions.date !== undefined) {
          dates = conditions.date;
        } else {
          dates = `${dateFormat(conditions.date, "yyyy-mm-dd")}`;
        }
        title = "Report Call Detail";
        filename = "report-call-detail";

        const header = [
          { header: "No", key: "no" },
          { header: "Call Date/Time", key: "calldate" },
          { header: "Agent", key: "agent" },
          { header: "Agent Fullname", key: "agent_fullname" },
          { header: "Campaign Name", key: "campaign_name" },
          { header: "Customer", key: "customer_name" },
          { header: "Phone Number Type", key: "phone_number_type" },
          { header: "Phone Number", key: "phone_number" },
          { header: "Call Duration", key: "call_duration" },
          { header: "Notes", key: "notes" },
          { header: "Outbound Status", key: "outbound_status" },
          { header: "Outbound Category", key: "outbound_category" },
          {
            header: "Outbound Category Detail",
            key: "outbound_categoriy_detail",
          },
          { header: "Filename", key: "filename" },
          { header: "Host Address", key: "host_address" },
          { header: "Upload Filename ", key: "upload_filename" },
        ];
        const { data } = await callsController.getReportCallDetail(conditions);
        const data_report = data;

        const timeColumn = ["I"];
        const tableLine = [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
        ];
        const mergeCells = "A1:P2";

        const fileName = `${filename}-${dateFormat(
          conditions.date,
          "yyyy-mm-dd-HH-MM-ss"
        )}`;
        generate = await thread.create({
          task: "export-report",
          header,
          data_report,
          fileName,
          dates,
          timeColumn,
          tableLine,
          title,
          mergeCells,
        });

        return generate;
      }
      break;
    default:
      console.log("error");
  }
};
