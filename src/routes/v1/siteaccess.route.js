const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

const siteAccessValidation = require('../../validations/siteaccess.validation');
const siteAccessController = require('../../controllers/siteaccess.controller');

const router = express.Router();

router
    .route('/')
    .post(auth('addSiteAccess'), validate(siteAccessValidation.createSiteAccess), siteAccessController.createSiteAccess)

module.exports = router;
