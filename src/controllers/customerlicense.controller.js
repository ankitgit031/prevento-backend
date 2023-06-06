const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { customerLicenseService, tokenService } = require('../services');

const createCustomerLicense = catchAsync(async (req, res) => {
    req.body.date_created = new Date();
    req.body.date_modified = new Date();
    req.body.license = await tokenService.generateLicense(req.body.customer_id, req.body.total_people_count, req.body.begin_date, req.body.expiry_date);
    const customerLicense = await customerLicenseService.createCustomerLicense(req.body);
    res.status(httpStatus.CREATED).send(customerLicense);
});

module.exports = {
    createCustomerLicense,
};