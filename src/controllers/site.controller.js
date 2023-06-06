const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { siteService } = require('../services');

const createSite = catchAsync(async (req, res) => {
    req.body.date_created = new Date();
    req.body.date_modified = new Date();
    const site = await siteService.createSite(req.body);
    res.status(httpStatus.CREATED).send(site);
});

module.exports = {
    createSite,
};