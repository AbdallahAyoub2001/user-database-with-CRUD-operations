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
    console.log("Server is listening on port 3000");
})

// Create connection
// const db = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: '',
//     database: 'users_db'
// })
//
// // connect to mysql
// db.connect( err => {
//     if(err) {
//         throw err
//     }
//     console.log("MySQL Connected.")
// })

/* Create database
app.get('/createDB', (req, res) => {
    let sql = "CREATE DATABASE users_db"
    db.query(sql, (err) => {
        if(err) {
        throw err;
        }
        res.send("Database Created");
    });
}); */

// Create table
// app.get('/createTable', (req, res) => {
//     let sql = "CREATE TABLE users(id int AUTO_INCREMENT, name varchar(40), age int, department varchar(20), PRIMARY KEY (id))"
//     db.query((sql, err) => {
//       if(err)
//           throw err;
//       res.send("Table Created!")
//     })
// })


