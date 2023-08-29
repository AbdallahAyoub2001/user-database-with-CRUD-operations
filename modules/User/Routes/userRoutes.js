// Routes page
const express = require('express');
const url = require("url");
const userController = require('../Controller/userController');
const { postValidation, putValidation, getValidation, deleteValidation, signupValidation,
    loginValidation, validate } = require('../Validation/userValidation.js')
const bodyParser = require("body-parser");
const authService = require('../../middlewares/auth');

const router = express.Router();
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

const secureRoute = require('./secure-routes');

//The main page of the server
router.get('/', (req, res) => {
    res.send("Welcome to users' server!");
})

// Insert User using post http://localhost:3000/users
router.post('/users', authService.verifyUser, postValidation, validate, userController.addUser);

// Select all users
// select a specific user using key and value http://localhost:3000/users/?key=name&value=Abood
router.get('/users', authService.verifyUser, userController.getUsers);

//Get User using one of his attributes http://localhost:3000/users/key/value
router.get('/users/:user_id', authService.verifyUser, getValidation, validate, userController.getUser)

// Update user's info using his id http://localhost:3000/users/id
router.put('/users/:user_id', authService.verifyUser, putValidation, validate, userController.updateUser);

// delete a user using his ID
router.delete('/users/:user_id', authService.verifyUser, deleteValidation, validate, userController.deleteUser);

// sign-up a new user
router.post('/signup', signupValidation, validate, userController.signup);
router.post('/login', loginValidation, validate, userController.login);
router.get('/profile', authService.verifyUser, secureRoute);

module.exports = router;