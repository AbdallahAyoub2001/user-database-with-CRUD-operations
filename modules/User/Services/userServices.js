const userDAO = require('../model/userModel')
const db = require("../../../db/db");
const authService = require('../../middlewares/auth');


class userServices {
    async addUser(userInfo) {

        // const {email, name, password, age, department} = userInfo;

        return userDAO.addUser(userInfo);
    }

    async authenticateUser (userLoginInfo){
        let user = await userDAO.getUser('email', userLoginInfo.email);

        if (!user) {
            return { status: 404, message: 'User not found' };
        }
        // console.log(user[0].password);
        // console.log(userLoginInfo.password);
        const passwordMatch = await authService.comparePasswords(userLoginInfo.password, user[0].password);
        if (!passwordMatch) {
            return { status: 401, message: 'Invalid credentials' };
        }

        const token = authService.generateJWTToken(user[0].id, user[0].email);
        return { status: 200, message: 'Sign in successful', token };
    };

    getUsers() {
        return userDAO.getUsers();
    }
    getUser(key, value) {
        return userDAO.getUser(key, value);
    }
    async updateUser(id, userInfo) {
        return userDAO.updateUser(id, userInfo);
    }

    async deleteUser(id) {
        return userDAO.deleteUser(id);
    }
}

module.exports = new userServices();