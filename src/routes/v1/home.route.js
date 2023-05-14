const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

const homeController = require('../../controllers/home.controller');
const homeValidation = require('../../validations/home.validation');

const router = express.Router();

router
    .route('/')
    .post(auth('getUsers'), validate(homeValidation.createHome), homeController.createHome)
    .get(auth('getUsers'), validate(homeValidation.getHomes), homeController.getHomes)

router
    .route('/:homeId')
    .get(auth('getUsers'), validate(homeValidation.getHome), homeController.getHome)
    .patch(auth('getUsers'), validate(homeValidation.updateHome), homeController.updateHome)
    .delete(auth('getUsers'), validate(homeValidation.deleteHome), homeController.deleteHome);



module.exports = router;
