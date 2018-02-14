const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const User = require('../models').User;

////////////////////////////////////////////////
// Helper Functions
////////////////////////////////////////////////

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.status(401).end('Not logged in');
}

////////////////////////////////////////////////
// Routes
////////////////////////////////////////////////

module.exports = function (app, passport) {
    var router = express.Router();

    // Login
    router.post('/login', function (req, res, next) {
          passport.authenticate('facebook-token');
    });

    router.post('/facebook-login', function (req, res, next) {
        passport.authenticate('facebook-token');
    });

    // Create User
    router.post('/', function (req, res) {
        User.findOne({ where: { facebookId: req.body.facebookId } }).then( existingUser => {
            if (existingUser) {
                res.status(400).end('User already exists.');
                return;
            }
            var password = req.body.password;
            delete req.body.password;
            User.create(req.body)
                .then(function (newUser) {
                    hashPassword(newUser, password);
                    res.status(200).json(newUser);
                })
                .catch(function (error) {
                    res.status(500).json(error);
                });
        });
    });

    // Get All Users
    // router.get('/', isLoggedIn, function (req, res, next) {
    //     User.findAll()
    //         .then(function (users) {
    //             res.status(200).json(users);
    //         })
    //         .catch(function (error) {
    //             res.status(500).json(error);
    //         });
    // });

    // Get User by ID
    router.get('/:id', isLoggedIn, function (req, res, next) {
        User.findById(req.params.id)
            .then(function (user) {
                res.status(200).json(user);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    });

    // Update User
    router.put('/:id', isLoggedIn, function (req, res, next) {
        User.update(req.body, {
            where: {
              id: req.params.id
            }
          })
          .then(function (updatedRecords) {
            res.status(200).json(updatedRecords);
          })
          .catch(function (error){
            res.status(500).json(error);
          });    
    });

    // Delete User
    router.delete('/:id', isLoggedIn, function (req, res, next) {
        User.destroy({
            where: {
              id: req.params.id
            }
          })
          .then(function (deletedRecords) {
            res.status(200).json(deletedRecords);
          })
          .catch(function (error){
            res.status(500).json(error);
          });
    });

    app.use("/users", router);
}
