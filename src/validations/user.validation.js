const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const { password, objectId } = require('./custom.validation');


let userHouses = Joi.object().keys({
    userHourseId: Joi.objectId().required(),
});

let userRenters = Joi.object().keys({
    userRenterId: Joi.objectId().required(),
});

const createUser = {
    body: Joi.object().keys({
        // date_created: Joi.date().iso(),
        // date_modified: Joi.date().iso().required(),
        email: Joi.string().required().email(),
        finger_print: Joi.string(),
        first_name: Joi.string().required(),
        middle_name: Joi.string(),
        last_name: Joi.string().required(),
        last_otp: Joi.number(),
        date_of_birth: Joi.string().pattern(/^\d{2}-\d{2}-\d{4}$/)
            .message('Date of birth must be in dd-mm-yyyy format')
            .custom((value, helpers) => {
                const dateParts = value.split('-');
                const day = parseInt(dateParts[0]);
                const month = parseInt(dateParts[1]) - 1; // Months are zero-based in JavaScript Date object
                const year = parseInt(dateParts[2])
                const date = new Date(year, month, day);
                if (isNaN(date.getTime())) {
                    return helpers.error('any.invalid');
                }
                return value;
            })
            .message('Invalid date of birth').required(),
        gender: Joi.string().valid('Male', 'Female').required(),
        phone: Joi.number().required(),
        alternate_phone: Joi.number(),
        last_signed_in: Joi.string(),
        login_type: Joi.string().valid('INFINITY', 'ORIGIN').required(),
        otp_expiry: Joi.date().iso(),
        user_state: Joi.number().valid(0, 1, 2, 3, 4).required(),
        password: Joi.string().required().custom(password),
    }),
};

const updateUser = {
    params: Joi.object().keys({
        userId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            firstName: Joi.string(),
            middleName: Joi.string(),
            lastName: Joi.string(),
            dateOfBirth: Joi.date().iso(),
            gender: Joi.string().valid('Male', 'Female'),
            countryCode: Joi.string(),
            state: Joi.string(),
            district: Joi.string(),
            city: Joi.string(),
            phone: Joi.number(),
            alternatePhone: Joi.number(),
            email: Joi.string().email(),
            password: Joi.string().custom(password),
            role: Joi.string().valid('renter', 'admin'),
            userHouses: Joi.array().items(userHouses),
            userRenters: Joi.array().items(userRenters)
        })
        .min(1),
};
const getUsers = {
    query: Joi.object().keys({
        name: Joi.string(),
        role: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const deleteUser = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId),
    }),
};

const getUser = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
};
