const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { objectId } = require('./custom.validation');

let houseRenters = Joi.object().keys({
    userRenterId: Joi.objectId().required(),
    startDate: Joi.date().iso(),
    endDate: Joi.date().iso()
});

const createHome = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        locality: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        district: Joi.string().required(),
        countryCode: Joi.string().required(),
        sqft: Joi.number().required(),
        type: Joi.string().valid('1R', '1RK', '1BHK', '2BHK', '1Floor', '2Floors').required(),
        isCctv: Joi.boolean(),
        isSecurityGuard: Joi.boolean(),
        isFireExtinguisher: Joi.boolean(),
        isBathroomToiletCombined: Joi.boolean().required(),
        bathroomQty: Joi.number().required(),
        isBalcony: Joi.boolean(),
        balconyQty: Joi.number().required(),
        isVacant: Joi.boolean().required(),
        vacantDate: Joi.date().iso().required(),
        renterDetails: Joi.array().items(houseRenters)
    }),
};

const updateHome = {
    params: Joi.object().keys({
        homeId: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        title: Joi.string(),
        locality: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        district: Joi.string(),
        countryCode: Joi.string(),
        sqft: Joi.number(),
        type: Joi.string().valid('1R', '1RK', '1BHK', '2BHK', '1Floor', '2Floors'),
        isCctv: Joi.boolean(),
        isSecurityGuard: Joi.boolean(),
        isFireExtinguisher: Joi.boolean(),
        isBathroomToiletCombined: Joi.boolean(),
        bathroomQty: Joi.number(),
        isBalcony: Joi.boolean(),
        balconyQty: Joi.number(),
        isVacant: Joi.boolean(),
        vacantDate: Joi.date().iso(),
        renterDetails: Joi.array().items(houseRenters)
    }).min(1),
};

const getHomes = {
    query: Joi.object().keys({
        city: Joi.string(),
        state: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const deleteHome = {
    params: Joi.object().keys({
        homeId: Joi.string().custom(objectId),
    }),
};

const getHome = {
    params: Joi.object().keys({
        homeId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createHome,
    getHomes,
    deleteHome,
    getHome,
    updateHome
};
