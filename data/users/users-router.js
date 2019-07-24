const router = require('express').Router();
const db = require('./users-model');
const restricted = require('../middlewares/restricted-middleware');

router.get('/', restricted, async (req, res) => {
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