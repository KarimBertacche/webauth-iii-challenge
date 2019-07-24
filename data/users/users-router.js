const router = require('express').Router();
const db = require('./users-model');
const restricted = require('../middlewares/restricted-middleware');
const checkDepartment = require('../middlewares/check-department');

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

router.get('/departments', [restricted, checkDepartment('front-end')], async (req, res) => {
    try {
        const departments = req.departments;
        const users = await db.getUsersByDepartment({ departments });

        res.status(200).json(users);
    } catch(error) {
        res.status(500).json({
            message: 'Server error while retrieving users by department'
        });
    }
});

module.exports = router;