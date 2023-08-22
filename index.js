// The main script for the server

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const url = require("url");
const router = require('./modules/User/Routes/userRoutes');

const app = express()
app.use(router);
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.listen(3000, () => {
})