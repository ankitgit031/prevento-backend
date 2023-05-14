const httpStatus = require('http-status');
const { Home } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a home
 * @param {Object} homeBody
 * @returns {Promise<User>}
 */
const createHome = async (homeBody) => {
    return Home.create(homeBody);
};

/**
 * Query for homes
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryHomes = async (filter, options) => {
    const homes = await Home.paginate(filter, options);
    return homes;
};

/**
 * Get home by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getHomeById = async (id) => {
    return Home.findById(id);
};

/**
 * Update user by id
 * @param {ObjectId} homeId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (homeId, updateBody) => {
    const home = await getHomeById(homeId);
    if (!home) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Home not found');
    }
    
    Object.assign(home, updateBody);
    await home.save();
    return home;
};

const deleteHomeById = async (homeId) => {
    const home = await getHomeById(homeId);
    if (!home) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Home not found');
    }
    await home.remove();
    return home;
};


module.exports = {
    createHome,
    queryHomes,
    getHomeById,
    deleteHomeById,
    updateUserById,
};
