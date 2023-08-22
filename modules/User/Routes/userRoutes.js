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
// select a specific user using key and value http://localhost:3000/users/?key=name&value=Abood
router.get('/users', userController.getUsers);

//Get User using one of his attributes http://localhost:3000/users/key/value
router.get('/users/:user_id', getValidation, validate, userController.getUser)

// Update user's info using his id http://localhost:3000/users/id
router.put('/users/:user_id', putValidation, validate, userController.updateUser);

// delete a user using his ID
router.delete('/users/:user_id', deleteValidation, validate, userController.deleteUser);

module.exports = router;