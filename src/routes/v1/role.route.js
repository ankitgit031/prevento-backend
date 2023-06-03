const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

const roleValidation = require('../../validations/role.validation');
const roleController = require('../../controllers/role.controller');

const router = express.Router();

router
    .route('/')
    .post(auth('addRole'), validate(roleValidation.createRole), roleController.createRole)

module.exports = router;
