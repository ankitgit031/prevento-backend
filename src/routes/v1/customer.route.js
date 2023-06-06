const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

const customerValidation = require('../../validations/customer.validation');
const customerController = require('../../controllers/customer.controller');

const router = express.Router();

router
    .route('/')
    .post(auth('addCustomer'), validate(customerValidation.createCustomer), customerController.createCustomer)
    // .get(auth('getUsers'), validate(homeValidation.getHomes), homeController.getHomes)

module.exports = router;
