var express = require('express');
var passport = require('passport');
const User = require('../models').User;


module.exports = function (app) {
    var router = express.Router();

    // Create User
    router.post('/', function (req, res) {
        User.create(req.body)
            .then(function (newUser) {
                res.status(200).json(newUser);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    });

    // Get All Users
    router.get('/', function (req, res, next) {
        User.findAll()
            .then(function (users) {
                res.status(200).json(users);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    });

    // Get User by ID
    router.get('/:id', function (req, res, next) {
        User.findById(req.params.id)
            .then(function (user) {
                res.status(200).json(user);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    });

    // #TODO: Implement Login w/ Passport.js
    router.post('/login', function (req, res, next) {
        // passport.use(new FacebookStrategy({
        //     clientID: process.env.CLIENT_ID,
        //     clientSecret: process.env.CLIENT_SECRET,
        //     callbackURL: "http://localhost:3000/"
        // },
        //     function (accessToken, refreshToken, profile, cb) {
        //         User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        //             return cb(err, user);
        //         });
        //     }
        // ));
    });

    app.use("/users", router);
}
