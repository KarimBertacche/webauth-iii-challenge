const express = require('express');
const server = express();
const authRouter = require('./data/auth/auth-router');
const usersRouter = require('./data/users/users-router');

server.use(express.json());
server.use('/api', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.send('Server up and running 😁')
});

module.exports = server;