const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { objectId } = require('./custom.validation');

const createCustomerLicense = {
    body: Joi.object().keys({
        begin_date: Joi.date().required(),
        begin_timestamp: Joi.date().timestamp().required(),
        category: Joi.string(),
        comments: Joi.string(),
        created_by: Joi.objectId().required(),
        current_people_count: Joi.number().required(),
        customer_id: Joi.objectId().required(),
        expiry_date: Joi.date().required(),
        expiry_timestamp: Joi.date().timestamp().required(),
        modified_by: Joi.objectId().required(),
        status: Joi.number().valid(0, 1).required(),
        total_people_count: Joi.number().required(),
        site_id: Joi.objectId().required(),
    }),
};

module.exports = {
    createCustomerLicense,
};
