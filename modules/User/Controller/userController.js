const userService = require('../Services/userServices');
const userDAO = require("../model/userModel");

class userController {
    async addUser(req, res) {
        try {
            const id = await userService.addUser(req.body);
            console.log("User inserted successfully");
            return res.status(201).json(id);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async getUsers(req, res) {
        try {
            const users = await userService.getUsers();
            return res.status(201).json(users);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async getUser(req, res) {
        try {
            const key = req.params.key;
            const value = req.params.value;
            const user = await userService.getUser(key, value);
            console.log("User found successfully");
            return res.status(201).json(user);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }
    async updateUser(req, res) {
        try {
            const id = req.params.id;
            const q = await userService.updateUser(id, req.body);
            console.log("User updated successfully");
            return res.status(201).json(id);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async deleteUser(req, res) {
        try {
            const id = req.params.id;
            const q = await userService.deleteUser(id);
            console.log("User deleted successfully");
            return res.status(201).json(id);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }
}

module.exports = new userController();