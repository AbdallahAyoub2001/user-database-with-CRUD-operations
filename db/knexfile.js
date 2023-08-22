// knexfile.js

module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'users_db'
        },
        migrations: {
            tableName: 'users'
        }
    },
};
