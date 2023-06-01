const express = require('express');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const homeRoute = require('./home.route');
const customerRoute = require('./customer.route');


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
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});


module.exports = router;
