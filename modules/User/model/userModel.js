const db = require('../../../db/db');
const bcrypt = require('bcrypt');
const authService = require("../../middlewares/auth");

class userModel {
    async addUser(userInfo) {
        const hashedPassword = await this.hashPassword(userInfo.password);

        let [id] = await db('users').insert({
            email: userInfo.email, name: userInfo.name, password: hashedPassword, age: userInfo.age, department: userInfo.department
        });
        await db.destroy();

        return id;
    }

    async getUsers() {
        let users = await db.select().from('users');
        await db.destroy();
        return users;
    }
    async getUser(key, value) {
        let user;
        user = await db('users').where(key, value);
        // console.log()
        return user;
    }

    async getUserPassword(email) {
        let pass;
        pass = await db.select('password').from('users').where('email', email);
        return pass;
    }
    async updateUser(id, userInfo) {
        const hashedPassword = await authService.hashPassword(userInfo.password);
        return db('users')
            .where({ id: id })
            .update({
                email: userInfo.email,
                name: userInfo.name,
                password: hashedPassword,
                age: userInfo.age,
                department: userInfo.department
            }, ['id']);

    }
    async deleteUser(id) {
        return db('users')
            .where({ id: id })
            .del();
    }

    async hashPassword() {
        const user = this;
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }

    async isValidPassword(password) {
        const user = this;
        return await bcrypt.compare(password, user.password);
    }

    async hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    };
}

module.exports = new userModel();