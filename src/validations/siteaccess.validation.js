const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { objectId } = require('./custom.validation');

const createSiteAccess = {
    body: Joi.object().keys({
        access_type: Joi.number().valid(0, 1, 2, 3, 4).required(),
        customer_id: Joi.objectId().required(),
        site_id: Joi.objectId().required(),
        user_id: Joi.objectId().required(),
    }),
};

module.exports = {
    createSiteAccess,
};
