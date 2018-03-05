/**
 * @author Haven Barnes <hab0020@auburn.edu>
 */

const express = require('express');
const passport = require('passport');
const ebay = require('../middleware/ebay.js');
const Order = require('../models').Order;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.status(401).end('Not logged in');
}

module.exports = function (app, passport) {
    var router = express.Router();

    // Create Order
    router.post('/', ebay.updateInventoryQuantity, function (req, res) {
        Order.create(req.body)
            .then(function (newOrder) {
                res.status(200).json(newOrder);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    });

    // Get All Orders
    router.get('/', isLoggedIn, function (req, res, next) {
        Order.findAll()
            .then(function (orders) {
                res.status(200).json(orders);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    });

    // Get Order by ID
    router.get('/:id', isLoggedIn, function (req, res, next) {
        Order.findById(req.params.id)
            .then(function (order) {
                res.status(200).json(order);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    });

    // Update Order
    router.put('/:id', isLoggedIn, function (req, res, next) {
        User.update(req.body, {
            where: {
                id: req.params.id
            }
        })
            .then(function (updatedRecords) {
                res.status(200).json(updatedRecords);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    });

    app.use("/users", router);
}
