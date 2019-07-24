module.exports = department => {
    return function(req, res, next) {
        const departments = req.decodedToken.department;
        if( departments && departments.includes(department)) {
            req.departments = req.decodedToken.department;
            next();
        } else {
            res.status(403).json({
                message: `Restricted access to only ${departments}`
            });
        }
    }
}