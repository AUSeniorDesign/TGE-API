var express = require('express');
var passport = require('passport')

module.exports = function (app) {
    var router = express.Router();

    // Login
    router.post('/login', function (req, res, next) {
        passport.use(new FacebookStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "http://localhost:3000/"
        },
            function (accessToken, refreshToken, profile, cb) {
                User.findOrCreate({ facebookId: profile.id }, function (err, user) {
                    return cb(err, user);
                });
            }
        ));
    });

    // Get User by ID
    router.get('/:id', function (req, res, next) {

    });

    app.use("/users", router);
}
