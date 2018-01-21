var express = require('express');

module.exports = function (app) {
    var router = express.Router();


    // Login
    router.post('/login', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err)
                return next(err);
            if (!user)
                return res.status(400).json({ SERVER_RESPONSE: 0, SERVER_MESSAGE: "Wrong Credentials" });
            req.logIn(user, function (err) {
                if (err)
                    return next(err);
                if (!err)
                    return res.json({ SERVER_RESPONSE: 1, SERVER_MESSAGE: "Logged in!" });

            });
        })(req, res, next);
    });

    // Get User by ID
    router.get('/:id', function (req, res, next) {
        
    });

    app.use("/users", router);
}



