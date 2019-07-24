const db = require('../database-config/config');

module.exports = {
    getUsers,
}

function getUsers() {
    return db('users');
}