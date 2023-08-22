const userDAO = require('../model/userModel')
const db = require("../../../db/db");

class userServices {
    addUser(userInfo) {
        // const {name, age, dep} = user;

        return userDAO.addUser(userInfo);
    }

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