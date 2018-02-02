const express = require('express');
const passport = require('passport');
const User = require('../models').User;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.end('Not logged in');
}

module.exports = function (app, passport) {
    var router = express.Router();

    // Login
    router.post('/login', function (req, res, next) {
          passport.authenticate('facebook');
    });

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
        // TODO: Validate this request is coming from own User
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
