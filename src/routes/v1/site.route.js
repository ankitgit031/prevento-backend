const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

const siteValidation = require('../../validations/site.validation');
const siteController = require('../../controllers/site.controller');

const router = express.Router();

router
    .route('/')
    .post(auth('addSite'), validate(siteValidation.createSite), siteController.createSite)
    // .get(auth('getUsers'), validate(homeValidation.getHomes), homeController.getHomes)

module.exports = router;
