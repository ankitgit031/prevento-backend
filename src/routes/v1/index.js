const express = require('express');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const homeRoute = require('./home.route');


const router = express.Router();

const defaultRoutes = [
    {
      path: '/auth',
      route: authRoute,
    },
    {
        path: '/users',
        route: userRoute,
    },
    {
        path: '/homes',
        route: homeRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});


module.exports = router;
