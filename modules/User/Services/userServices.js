const userDAO = require('../model/userModel')
const db = require("../../../db/db");
const authService = require('../../middlewares/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'secret-key';


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

        const passwordMatch = await this.comparePasswords(userLoginInfo.password, user[0].password);
        if (!passwordMatch) {
            return { status: 401, message: 'Invalid credentials' };
        }

        const token = this.generateJWTToken(user[0].id, user[0].email);
        // console.log(token);
        return { status: 200, message: 'Sign in successful', token: token };
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

    async comparePasswords(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    };

    generateJWTToken(userId, email) {
        return jwt.sign({ userId, email }, secretKey, { expiresIn: '1h' });
    };
}

module.exports = new userServices();