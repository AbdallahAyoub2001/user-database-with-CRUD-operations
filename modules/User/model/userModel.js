const db = require('../../../db/db');
const knex = require("knex");

class userModel {
    async addUser(userInfo) {
        // const trimmedName = toString(name).trim();
        // const newUser = {
        //     name: trimmedName,
        //     age: age,
        //     department: department
        // };
        let [id] = await db('users').insert({
            name: userInfo.name, age: userInfo.age, department: userInfo.department
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
        return user;
    }
    async updateUser(id, userInfo) {
        return db('users')
            .where({ id: id })
            .update({
                name: userInfo.name,
                age: userInfo.age,
                department: userInfo.department
            }, ['id']);

    }
    async deleteUser(id) {
        return db('users')
            .where({ id: id })
            .del();
    }
}

module.exports = new userModel();