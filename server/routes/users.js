var express = require('express');
var passport = require('passport')

module.exports = function (app) {
    var router = express.Router();

    // Create User
    router.post('/', function (req, res) {
        models.User.create({
            facebook_id: req.body.facebook_id,
            name: req.body.name
        })
        .save()
        .then(function () {
            res.redirect('/');
        })
        .spread((user, created) => {
            console.log(user.get({
              plain: true
            }))
            console.log(created)
        });
    });

    // Get User by ID
    router.get('/:id', function (req, res, next) {

    });

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

    

    app.use("/users", router);
}
