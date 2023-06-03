const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { objectId } = require('./custom.validation');

const createSite = {
    body: Joi.object().keys({
        customer_id: Joi.objectId().required(),
        default_flag: Joi.boolean().required(),
        ip_address: Joi.string(),
        is_onboarding_completed: Joi.boolean(),
        site_description: Joi.string(),
        site_icon_url: Joi.string(),
        site_name: Joi.string().required(),
        status_type: Joi.number().valid(0, 1).required(),
    }),
};

module.exports = {
    createSite,
};
