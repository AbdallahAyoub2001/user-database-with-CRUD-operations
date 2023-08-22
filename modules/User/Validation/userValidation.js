const { body, validationResult, param} = require('express-validator')
const db = require("../../../db/db");
const userModel = require('../model/userModel')

// check that the name isn't empty
let name = body('name').notEmpty().withMessage('Name cannot be empty');

// check that the age is not empty and it's numeric
let age =  body('age').notEmpty().withMessage('Age cannot be empty').isNumeric()
    .withMessage('Age have to be a number');

// check that the dep is not empty and it's one of the list departments
let dep = body('department').notEmpty().withMessage('Age cannot be empty')
    .isIn(["CE", "CS", "nodeJS", "back", "SpringBoot", "React", "C#"])
    .withMessage("this department is invalid");

// check that the given id belongs to a user
let id = param('id').custom(async (value) => {
        const user = (await userModel.getUser('id', value));
        if (!user) {
            throw new Error();
        }
    }).withMessage('User does not exist!!');

// This one is used in the get method to check if the data given to get a user is valid, I used separate attribute because the name of the parameter is 'value' not 'id'
let userExistence = param('value').custom(async (val) => {
                                        const user = await userModel.getUser('id', val);
                                        if (!user) {
                                            throw new Error();
                                        }
                                    }).withMessage('User does not exist!!');

const postValidation = [
        name,
        age,
        dep
    ]

const putValidation = [
        id,
        name,
        age,
        dep
    ]

const getValidation = [
        userExistence
    ]

const deleteValidation = [
        id
    ]

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    deleteValidation,
    putValidation,
    postValidation,
    getValidation,
    //userExistence,
    validate,
}