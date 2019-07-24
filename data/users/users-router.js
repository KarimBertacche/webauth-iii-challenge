const router = require('express').Router();
const db = require('./users-model');

router.get('/', async (req, res) => {
    try {
        const users = await db.getUsers();

        res.status(200).json(users);
    } catch(error) {
        res.status(500).json({
            message: 'Server error while retrieving users'
        });
    }
});

module.exports = router;