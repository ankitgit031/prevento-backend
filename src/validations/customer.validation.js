const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { objectId } = require('./custom.validation');

const createCustomer = {
    body: Joi.object().keys({
        description: Joi.string(),
        name: Joi.string().required(),
        status: Joi.number().valid(0, 1).required(),
        phone: Joi.number(),
    }),
};

module.exports = {
    createCustomer,
};
