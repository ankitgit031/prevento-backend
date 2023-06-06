const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { roleService } = require('../services');

const createRole = catchAsync(async (req, res) => {
    req.body.date_created = new Date();
    req.body.date_modified = new Date();
    const role = await roleService.createRole(req.body);
    res.status(httpStatus.CREATED).send(role);
});

const getRole = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await roleService.queryRole(filter, options);
    res.send(result);
});

module.exports = {
    createRole,
    getRole,
};