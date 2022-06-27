const dbQueryHelper = require('../helpers/db_query')
const fileUploadsController = require('../controller/file_uploads')
const customersController = require('../controller/customers')
const fieldController = require('../controller/campaign_fields')
const emailsController = require('../controller/emails')
const emailContentsController = require('../controller/email_contents')
const readXlsxFile = require('read-excel-file/node')
const moment = require('moment')
const table = 'campaigns'

exports.getAll = async (conditions) => {
    let conditionTypes = {}
    conditionTypes = {
        'like': ['name']
    }
    

    const data = await dbQueryHelper.getAll({ table, conditionTypes, conditions})

    return data
};


exports.getCount = async (conditions) => {
    const columnSelect = ['id']
      const data = await dbQueryHelper.getAll({ table, columnSelect, conditions })

    return data
};

exports.getAllByUser = async (conditions) => {
    let conditionTypes = {}
    conditionTypes = {
        'like': ['name']
    }

    const join = [
        `JOIN campaign_users ON ${table}.id = campaign_users.campaign_id`,
        
        
    ]

    


    const groupBy = [`campaigns.id`]
    const customConditions = []

    if (conditions.user_id !== undefined) {
        customConditions.push(`campaign_users.user_id = ${conditions.user_id}`)
        delete conditions.user_level_id
    }

    const data = await dbQueryHelper.getAll({ table, conditionTypes, conditions, customConditions, groupBy })

    return data
};

exports.getDetail = async (conditions) => {

    const data = await dbQueryHelper.getDetail({ table, conditions })

    return data
}



exports.insertData = async (data) => {
    const protectedColumns = ['id']
    const cacheKeys = [table]
    const result = await dbQueryHelper.insertData({ table, data, protectedColumns, cacheKeys })

    return result
}

exports.insertManyData = async (data) => {
    const protectedColumns = ['id']
    const cacheKeys = [table]
    const result = await dbQueryHelper.insertManyData({ table, data, protectedColumns, cacheKeys })

    return result
}

exports.updateData = async (data, conditions) => {
    const protectedColumns = ['id']
    const result = await dbQueryHelper.updateData({ table, data, conditions, protectedColumns })

    return result
}

exports.upload = async (data) => {
    const result = await fileUploadsController.insertData(data)

    if (result.data !== false) {
        let headers = []

        const rows = await readXlsxFile(`${data.path}${data.uploaded_filename}`)
        if (rows) {
            // read first row: rows[0]
            for (let i = 0; i < rows[0].length; i++) {
                let header = {
                    index: i,
                    field: rows[0][i]
                }
                headers.push(header)
            }

            result.data.header = headers
        }
    }

    return result
}


exports.upload_info = async (data) => {
    const result = await fileUploadsController.insertData(data)

    if (result.data !== false) {
        result
    }

    return result
}

exports.importCallCampaign = async (user_id, campaign_id, file_upload_id, data) => {
    let result = {
        data: false
    }

    if (data) {
        const fileUpload = await fileUploadsController.getDetail({ id: file_upload_id })

        if (fileUpload.data !== false) {
            const rows = await readXlsxFile(`${fileUpload.data.path}${fileUpload.data.uploaded_filename}`)

            if (rows) {
                rows.shift() // skip header       

                let total_inserted = 0

                // loop over rows
                for (let i = 0; i < rows.length; i++) {

                    values = {
                        campaign_id,
                        file_upload_id,
                        customer_status_id: 1,
                        next_call_date: 'NOW()',
                        is_active: 0,
                        is_req_callfile: 1,
                        created_by: user_id
                    }

                    for (key in data) {
                        values[key] = rows[i][data[key]]
                    }

                    const insertResult = await customersController.insertData(values)
                    if (insertResult.data !== false) {
                        total_inserted++
                    }
                }


                if (total_inserted > 0) {
                    await fileUploadsController.updateData({ is_imported: 1 }, { id: file_upload_id })
                    await customersController.updateData({ is_active: 1 }, { campaign_id: campaign_id, file_upload_id: file_upload_id })
                }

                result = {
                    data: `${total_inserted} imported`
                }
            }
        }


    }


    return result
}


exports.importEmailCampaign = async (user_id, campaign_id, file_upload_id, data) => {
    let result = {
        data: false
    }

    if (data) {
        const fileUpload = await fileUploadsController.getDetail({ id: file_upload_id })

        if (fileUpload.data !== false) {
            const rows = await readXlsxFile(`${fileUpload.data.path}${fileUpload.data.uploaded_filename}`)

            if (rows) {
                rows.shift() // skip header       

                let total_inserted = 0

                // loop over rows
                for (let i = 0; i < rows.length; i++) {

                    values = {
                        campaign_id,
                        file_upload_id,
                        customer_status_id: 1,
                        is_active: 0,
                        is_req_callfile: 0,
                        created_by: user_id
                    }

                    for (key in data) {
                        values[key] = rows[i][data[key]]
                    }

                    // insert to table customers
                    const insertResult = await customersController.insertData(values)
                    if (insertResult.data !== false) {
                        total_inserted++
                    }
                }


                if (total_inserted > 0) {
                    await fileUploadsController.updateData({ is_imported: 1 }, { id: file_upload_id })
                    await customersController.updateData({ is_active: 1 }, { campaign_id: campaign_id, file_upload_id: file_upload_id })

                    // get email template
                    const emailContent = await emailContentsController.getDetail({ campaign_id: campaign_id })

                    // get inserted customers
                    const customers = await customersController.getAll({ campaign_id: campaign_id, file_upload_id: file_upload_id, limit: 0 })

                    if (emailContent.data !== false && customers.data !== false) {

                        // loop customers and insert to  table emails
                        customers.data.map(async cust => {
                            let contents = emailContent.data.content.replace('&lt;&lt;fullname&gt;&gt;', cust.fullname)
                                .replace('&lt;&lt;phone_1&gt;&gt;', cust.phone_1)
                                .replace('&lt;&lt;phone_2&gt;&gt;', cust.phone_2)
                                .replace('&lt;&lt;email&gt;&gt;', cust.email)
                                .replace('&lt;&lt;card_number&gt;&gt;', cust.card_number)
                                .replace('&lt;&lt;card_type&gt;&gt;', cust.card_type)
                                .replace('&lt;&lt;limit&gt;&gt;', cust.limit)
                                .replace('&lt;&lt;card_since_year&gt;&gt;', cust.card_since_year)
                                .replace('&lt;&lt;card_since_month&gt;&gt;', cust.card_since_month)
                                .replace('&lt;&lt;card_exp_date&gt;&gt;', cust.card_exp_date)
                                .replace('&lt;&lt;card_emboss_name&gt;&gt;', cust.card_emboss_name)
                                .replace('&lt;&lt;amount&gt;&gt;', cust.amount)
                                .replace('&lt;&lt;account_no&gt;&gt;', cust.account_no)
                                .replace('&lt;&lt;bank_interest&gt;&gt;', cust.bank_interest)
                                .replace('&lt;&lt;mother_name&gt;&gt;', cust.mother_name)
                                .replace('&lt;&lt;age&gt;&gt;', cust.age)
                                .replace('&lt;&lt;gender&gt;&gt;', cust.gender)
                                .replace('&lt;&lt;birth_place&gt;&gt;', cust.birth_place)
                                .replace('&lt;&lt;birth_date&gt;&gt;', cust.birth_date)
                                .replace('&lt;&lt;merchant&gt;&gt;', cust.merchant)
                                .replace('&lt;&lt;transaction_date&gt;&gt;', cust.transaction_date)
                                .replace('&lt;&lt;home_address&gt;&gt;', cust.home_address)
                                .replace('&lt;&lt;home_city&gt;&gt;', cust.home_city)
                                .replace('&lt;&lt;home_zip&gt;&gt;', cust.home_zip)
                                .replace('&lt;&lt;office_address&gt;&gt;', cust.office_address)
                                .replace('&lt;&lt;office_city&gt;&gt;', cust.office_city)
                                .replace('&lt;&lt;office_zip&gt;&gt;', cust.office_zip)
                                .replace('&lt;&lt;income&gt;&gt;', cust.income)
                                .replace('&lt;&lt;business_type&gt;&gt;', cust.business_type)
                                .replace('&lt;&lt;occupation&gt;&gt;', cust.occupation)
                                .replace('&lt;&lt;ktp&gt;&gt;', cust.ktp)
                                .replace('&lt;&lt;npwp&gt;&gt;', cust.npwp)
                                .replace('&lt;&lt;tenor&gt;&gt;', cust.tenor)
                                .replace('&lt;&lt;bank_name&gt;&gt;', cust.bank_name)
                            const dataEmail = {
                                direction_id: 2,
                                subject: emailContent.data.subject,
                                content: contents,
                                email_to: cust.email,
                                customer_id: cust.id,
                                email_status_id: 1,
                                created_by: user_id,
                                campaign_id: cust.campaign_id,
                                is_complete: 1
                            }
                            await emailsController.insertData(dataEmail)
                        })
                    }
                }

                result = {
                    data: `${total_inserted} imported`
                }
            }
        }
    }
    return result
}


exports.listCampaignCall = async (conditions) => {
    const columnSelect = ['id', 'name', 'start_date', 'end_date']
    const customConditions = []
    const conditionTypes = { 'like': ['name'] }

    if (conditions.start_date_list !== undefined) {
        customConditions.push(`DATE(start_date) >= '${conditions.start_date_list}'`)
    }
    if (conditions.end_date_list !== undefined) {
        customConditions.push(`DATE(end_date) <= '${conditions.end_date_list}'`)
    }
    customConditions.push(`media_id = 1`)
    const customColumns = [
        `( SELECT COUNT( campaign_users.id ) FROM campaign_users WHERE campaign_users.campaign_id = campaigns.id) AS total_agent`,
        `(SELECT COUNT( customers.id ) From customers WHERE customers.campaign_id = campaigns.id AND customers.is_active = 1 ) AS total_customer`,
        `( SELECT COUNT( calls.id ) FROM calls WHERE calls.campaign_id = campaigns.id and calls.outbound_status_id >= 1 ) AS total_call`,
        `campaigns.is_active AS is_active_campaign`
    ]
    const groupBy = [`id`]

    const data = await dbQueryHelper.getAll({ table, conditions, customConditions, conditionTypes, columnSelect, customColumns, groupBy })

    return data
}


exports.listEmailCampaign = async (conditions) => {

    const customConditions = []
    const conditionTypes = { 'like': ['name'] }
    if (conditions.start_date_list !== undefined) {
        customConditions.push(`DATE(start_date) >= '${conditions.start_date_list}'`)
    }
    if (conditions.end_date_list !== undefined) {
        customConditions.push(`DATE(end_date) <= '${conditions.end_date_list}'`)
    }
    customConditions.push(`media_id = 2 AND is_active = 1`)
    const columnSelect = ['id', 'name', 'start_date', 'end_date']
    const customColumns = [`(SELECT COUNT( emails.id ) from emails where emails.campaign_id = campaigns.id )AS total_receptients`,]
    const join = [
        `LEFT JOIN emails ON ${table}.id = emails.campaign_id`
    ]
    const groupBy = ['campaigns.id']

    const data = await dbQueryHelper.getAll({ table, conditions, conditionTypes, customConditions, columnSelect, customColumns, join, groupBy })

    return data
}
