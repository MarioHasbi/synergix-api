const dbQueryHelper = require("../helpers/db_query");
const table = "customers";

exports.getAll = async (conditions) => {
  const customConditions = [];
  const conditionTypes = { like: ["fullname", "phone_1"] };
  const customColumns = [
    "outbound_categories.name AS outbound_category_name",
    "outbound_category_details.name AS outbound_category_detail_name",
    "customer_statuses.name AS customer_status_name",
    "campaigns.name AS campaign_name",
    "file_uploads.original_filename AS filename",
    "checking_statuses.name AS checking_status",
    "checking_reasons.name AS checking_reason",
  ];

  if (conditions.filename !== undefined) {
    customConditions.push(
      `file_uploads.original_filename like '%${conditions.filename}%'`
    );
  }

  customConditions.push(`file_uploads.file_type_id = 1`);

  const join = [
    "LEFT JOIN outbound_categories ON outbound_categories.id = customers.outbound_category_id",
    "LEFT JOIN outbound_category_details ON outbound_category_details.id = outbound_category_detail_id",
    "LEFT JOIN customer_statuses ON customer_statuses.id = customers.customer_status_id",
    "JOIN campaigns ON campaigns.id = customers.campaign_id",
    "JOIN file_uploads ON file_uploads.id = customers.file_upload_id",
    "LEFT JOIN checking_statuses ON checking_statuses.id = customers.checking_status_id",
    "LEFT JOIN checking_reasons ON checking_reasons.id = customers.checking_status_id",
  ];
  const data = await dbQueryHelper.getAll({
    table,
    conditions,
    conditionTypes,
    customConditions,
    customColumns,
    join,
  });
  return data;
};

exports.getFields = async (conditions, colom) => {
  columnSelect = [colom];
  const data = await dbQueryHelper.getAll({ table, conditions, columnSelect });
  return data;
};

exports.getDetail = async (conditions) => {
  const customColumns = [
    "(SELECT calls.phone_number FROM calls WHERE calls.customer_id = customers.id ORDER BY calls.id DESC LIMIT 1) AS last_call_phone_number",
    "(SELECT TIMEDIFF(calls.hangup_date,calls.answer_date) FROM calls WHERE calls.customer_id = customers.id ORDER BY calls.id DESC LIMIT 1) AS last_call_duration",
    "campaigns.name AS campaign_name",
    "outbound_categories.name AS outbound_category_name",
    "outbound_category_details.name AS outbound_category_detail_name",
    "(SELECT calls.phone_number FROM calls WHERE calls.customer_id = customers.id ORDER BY calls.id DESC LIMIT 1 ) AS phone_number",
    "(SELECT TIMEDIFF(hangup_date,answer_date) FROM calls WHERE calls.customer_id = customers.id ORDER BY calls.id DESC LIMIT 1 ) AS call_duration",
    "checking_reasons.name AS checking_reason",
    "checking_statuses.name AS checking_status",
  ];
  const join = [
    `JOIN campaigns ON campaigns.id = ${table}.campaign_id`,
    "LEFT JOIN outbound_categories ON outbound_categories.id = customers.outbound_category_id",
    "LEFT JOIN outbound_category_details ON outbound_category_details.id = outbound_category_detail_id",
    "LEFT JOIN checking_reasons ON customers.checking_reason_id = checking_reasons.id",
    "LEFT JOIN checking_statuses ON customers.checking_status_id = checking_statuses.id",
  ];
  const data = await dbQueryHelper.getDetail({
    table,
    conditions,
    customColumns,
    join,
  });
  return data;
};

exports.insertData = async (data) => {
  const protectedColumns = ["id"];
  const cacheKeys = [table];
  const result = await dbQueryHelper.insertData({
    table,
    data,
    protectedColumns,
    cacheKeys,
  });

  return result;
};

exports.updateData = async (data, conditions) => {
  const protectedColumns = ["id"];
  const result = await dbQueryHelper.updateData({
    table,
    data,
    conditions,
    protectedColumns,
  });

  return result;
};
