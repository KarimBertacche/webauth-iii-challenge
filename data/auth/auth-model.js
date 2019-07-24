const db = require('../database-config/config');

module.exports = {
    registerUser,
    getUserById,
    findUserBy,
}

function getUserById(id) {
    return db('users').where({ id }).first();
}

function registerUser(credentials) {
    return db('users').insert(credentials).then(id => {
        const [ userId ] = id 
        return getUserById(userId);
    });
}

function findUserBy(filter) {
    return db('users').where(filter).first();
}