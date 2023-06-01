const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { customerService } = require('../services');

const createCustomer = catchAsync(async (req, res) => {
    req.body.date_created = new Date();
    req.body.date_modified = new Date();
    const customer = await customerService.createCustomer(req.body);
    res.status(httpStatus.CREATED).send(customer);
});

const getHomes = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['city', 'state']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await homeService.queryHomes(filter, options);
    res.send(result);
});

const deleteHome = catchAsync(async (req, res) => {
    await homeService.deleteHomeById(req.params.homeId);
    res.status(httpStatus.NO_CONTENT).send();
    
});

const getHome = catchAsync(async (req, res) => {
    const home = await homeService.getHomeById(req.params.homeId);
    if (!home) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Home not found');
    }
    res.send(home);
});

const updateHome = catchAsync(async (req, res) => {
    const home = await homeService.updateUserById(req.params.homeId, req.body);
    res.send(home);
});


module.exports = {
    createCustomer,
    getHomes,
    deleteHome,
    getHome,
    updateHome,
};