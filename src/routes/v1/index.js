const express = require('express');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const homeRoute = require('./home.route');
const customerRoute = require('./customer.route');
const siteRoute = require('./site.route');
const siteAccessRoute = require('./siteaccess.route');
const customerLicenseRoute = require('./customerlicense.route');


const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/user',
        route: userRoute,
    },
    {
        path: '/homes',
        route: homeRoute,
    },
    {
        path: '/customer',
        route: customerRoute,
    },
    {
        path: '/site',
        route: siteRoute,
    },
    {
        path: '/siteacess',
        route: siteAccessRoute,
    },
    {
        path: '/customerlicense',
        route: customerLicenseRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});


module.exports = router;
