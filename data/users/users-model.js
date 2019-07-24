const db = require('../database-config/config');

module.exports = {
    getUsers,
    getUsersByDepartment
}

function getUsers() {
    return db('users');
}

function getUsersByDepartment(filter) {
    return db('users').where(filter);
}