const httpStatus = require('http-status');
const { CustomerLicense } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a customer
 * @param {Object} customerLicenseBody
 * @returns {Promise<CustomerLicense>}
 */
const createCustomerLicense= async (customerLicenseBody) => {
    return CustomerLicense.create(customerLicenseBody);
};

const deleteHomeById = async (homeId) => {
    const home = await getHomeById(homeId);
    if (!home) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Home not found');
    }
    await home.remove();
    return home;
};


module.exports = {
    createCustomerLicense,
};
