const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { objectId } = require('./custom.validation');

const createRole = {
    body: Joi.object().keys({
        customer_id: Joi.objectId().required(),
        role_description: Joi.string(),
        role_name: Joi.string().required(),
        role_type: Joi.number().valid(0, 1, 2).required(),
    }),
};

module.exports = {
    createRole,
};
