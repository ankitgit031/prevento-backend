const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

const customerLicenseValidation = require('../../validations/customerlicense.validation');
const customerLicenseController = require('../../controllers/customerlicense.controller');

const router = express.Router();

router
    .route('/')
    .post(auth('addCustomerLicense'), validate(customerLicenseValidation.createCustomerLicense), customerLicenseController.createCustomerLicense)

module.exports = router;
