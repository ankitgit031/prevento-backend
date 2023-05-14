const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

const userController = require('../../controllers/user.controller');
const userValidation = require('../../validations/user.validation');

const router = express.Router();

router
    .route('/')
    .post(validate(userValidation.createUser), userController.createUser)
    // .get(userController.getUser)
    .get(validate(userValidation.getUsers), userController.getUsers)

router
    .route('/:userId')
    .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
    .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
    .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);


// router
//     .route('/')
//     .post(auth('manageUsers'), validate(userValidation.createUser), userController.createUser)
//     .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);

module.exports = router;
