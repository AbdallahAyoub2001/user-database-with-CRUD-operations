// The main script for the server

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const url = require("url");
const router = require('./modules/User/Routes/userRoutes');
// require('./modules/middlewares/auth');
const secureRoute = require('./modules/User/Routes/secure-routes');

const app = express()
app.use(router);
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', secureRoute);

app.listen(3000, () => {
})