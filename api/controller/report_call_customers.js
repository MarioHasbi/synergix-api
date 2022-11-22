const dbQueryHelper = require('../helpers/db_query')
const table = 'calls'
const dateFormat = require('dateformat')
const excel = require('../helpers/generate_excel')
exports.getAll = async (conditions) => {
    const customConditions = []
    const columnSelect = ["id"]
    const customColumns = [
        `calls.call_date as call_date`,
        `users.username as agent`,
        `users.fullname AS agent_name`,
        `customers.fullname AS customer_name`,
        `campaigns.name AS campaign_name`,
        `calls.phone_number as phone_number`, 
        `ifnull(timediff(calls.hangup_date,calls.call_date), '00:00:00' ) AS duration`,
        `calls.note as note`,
        `outbound_statuses.name AS outbound_statuses`,
        `outbound_categories.name AS outbound_categories`,
        `outbound_category_details.name as outbound_category_details`,
        `calls.filename AS filename`,
        `users.host_address AS host_address`,
    ]

    if (conditions.start !== undefined) {
        const start = dateFormat(conditions.start, 'yyyy-mm-dd')
        let end = start
        if (conditions.end !== undefined)
            end = dateFormat(conditions.end, 'yyyy-mm-dd')
        else
            end = dateFormat(conditions.start, 'yyyy-mm-dd')
        let custom = `DATE(${table}.call_date) BETWEEN "${start}" AND "${end}" AND calls.outbound_status_id =1`
        customConditions.push(custom)
    }

    const join = [
        `LEFT JOIN users ON users.id = ${table}.user_id`,
        `LEFT JOIN campaigns ON campaigns.id = ${table}.campaign_id`,
        `LEFT JOIN customers ON customers.id = ${table}.customer_id`,
        `LEFT JOIN outbound_statuses ON outbound_statuses.id = ${table}.outbound_status_id`,
        `LEFT JOIN outbound_categories ON outbound_categories.id = ${table}.outbound_category_id`,
        `LEFT JOIN outbound_category_details ON outbound_category_details.id = ${table}.outbound_category_detail_id`,
    ]
    const data = await dbQueryHelper.getAll({ table, conditions, join, columnSelect, customColumns, customConditions })

    return data
};

exports.generateFile = async (conditions) => {
    const filename = "report-call-customer"
    const concatData = []
    const { data } = await this.getAll(conditions)
    const header = ["No", "Call Date/Time", "Agent", "Agent Fullname", "Campaign Name",
        "Customer", "Phone Number", "Duration", "Note",
        "Connect", "Contact", "Outbound Category Detail", "File Name", "Host Addr"];
    data.map((value, index) => {
        concatData.push([(index + 1), value.call_date, value.agent, value.agent_name,
        value.campaign_name, value.customer_name, value.phone_number,
        value.duration, value.note, value.outbound_statuses, value.outbound_categories, value.outbound_category_details,
        value.filename, value.host_address])
    })
    const generate = await excel(header, concatData, `${filename}-${dateFormat(conditions.start, 'yyyy-mm-dd')}`)
    return generate
}
