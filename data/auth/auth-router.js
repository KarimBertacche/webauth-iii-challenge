const router = require('express').Router();
const db = require('./auth-model');

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if(username && password) {
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

module.exports = router;