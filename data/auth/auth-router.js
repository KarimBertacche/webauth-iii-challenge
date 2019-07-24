const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./auth-model');
const secret = require('../secret');

router.post('/register', async (req, res) => {
    try {
        let { username, password } = req.body;

        if(username && password) {
            password = bcrypt.hashSync(password, 12);

            const newUser = await db.registerUser({ username, password });
    
            res.status(201).json(newUser);

        } else {
            res.status(404).json({
                message: 'Missing credentials'
            });
        }  
    } catch(error) {
        res.status(500).json({
            message: 'Server error while registering user'
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await db.findUserBy({ username });

        if(user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            
            res.status(200).json({
                message: `Welcome ${user.username}`,
                token
            });
        } else {
            res.status(404).json({
                message: 'Invalid Credentials'
            });
        }
    } catch(error) {
        res.status(500).json({
            message: 'Server error while login in user'
        });
    }
});

function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
    }

    const options = {
        expiresIn: '1h'
    }

    return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;