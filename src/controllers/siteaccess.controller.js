const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { siteAccessService } = require('../services');

const createSiteAccess = catchAsync(async (req, res) => {
    req.body.date_created = new Date();
    req.body.date_modified = new Date();
    const siteAccess = await siteAccessService.createSiteAccess(req.body);
    res.status(httpStatus.CREATED).send(siteAccess);
});

module.exports = {
    createSiteAccess,
};