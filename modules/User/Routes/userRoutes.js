// Routes page

const express = require('express');
const url = require("url");
const userController = require('../Controller/userController');
const { postValidation, putValidation, getValidation, deleteValidation, validate } = require('../Validation/userValidation.js')
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//The main page of the server
router.get('/', (req, res) => {
    res.send("Welcome to users' server!");
})

// Insert User using post http://localhost:3000/users
router.post('/users', postValidation, validate, userController.addUser);

// Select all users
router.get('/users', userController.getUsers);

//Get User using one of his attributes http://localhost:3000/users/key/value
router.get('/users/:key/:value', getValidation, validate, userController.getUser)

// Update user's info using his id http://localhost:3000/users/id
router.put('/users/:id', putValidation, validate, userController.updateUser);

// delete a user using his ID
router.delete('/users/:id', deleteValidation, validate, userController.deleteUser);

module.exports = router;

//Insert User using get http://localhost:3000/addUser?name=Sameer&age=29&dep=back
// app.get('/addUser', (req, res) => {
//     const q = url.parse(req.url, true).query;
//     let post = {name: q.name, age: q.age, department: q.dep}
//     let sql = 'INSERT INTO users SET ?'
//     let query = db.query(sql, post, err => {
//         if(err)
//             throw err;
//
//         console.log("User Added Successfully!");
//         return res.send("User Added Successfully!");
//
//     })
// })

//Get All Users http://localhost:3000/users
// app.get('/users', (req, res) => {
//
//     let sql = `SELECT * FROM users`
//     let query = db.query(sql, (err, result) => {
//         if(err)
//             throw err;
//         res.json(result);
//         console.log("Users are shown");
//     })
// })

//Get User By ID http://localhost:3000/users/2
// app.get('/users/:key/:value', (req, res) => {
//     // const q = url.parse(req.url, true).query;
//     const key = toString(${req.params.key})
//     let sql;
//     if(key === "id")
//         sql = `SELECT * FROM users WHERE id = ${req.params.value}`;
//     else if (key === "name")
//         sql = `SELECT * FROM users WHERE name = '${req.params.value}'`;
//     else if (key === "department")
//         sql = `SELECT * FROM users WHERE department = '${req.params.value}'`;
//     let query = db.query(sql, (err, result) => {
//         if(err)
//             throw err;
//         res.json(result);
//         console.log("User Found!");
//     })
// })

// Update user
// app.put('/users/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const newData = req.body;
//     // const newData = {name: "Abood", age: "23", department: "nodeJS"}
//
//     let sql = 'UPDATE users set ? WHERE id = ?'
//     let query = db.query(sql, [newData, id], (err, result) => {
//         if(err) {
//             console.error('Error updating data: ', err);
//             res.status(500).json({ error: 'Error updating data'});
//         }
//         console.log('User\'s data updated successfully');
//         res.status(201);
//         return res.send(result);
//     })
// })

// Delete User
// app.delete('/users/:id', (req, res) => {
//     let sql = `Delete from users where id = ${req.params.id}`
//     let query = db.query(sql, err => {
//         if(err)
//             throw err;
//         res.status(200)
//         return res.send('User has been deleted')
//     })
// })