const db = require('../database-config/config');

module.exports = {
    registerUser,
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