/**
 * @author Haven Barnes <hab0020@auburn.edu>
 */

const express = require('express');
const passport = require('passport');
const ebay = require('../middleware/ebay.js');
const Order = require('../models').Order;
const User = require('../models').User;
const OrderItem = require('../models').OrderItem;
const Address = require('../models').Address;

module.exports = function (app, passport) {
    var router = express.Router();

    // Create Order
    /**
     * More description coming soon...
     * 
     * Order Body Format:
     * 
     * order: {
     *  
     * }
     * 
     */
    router.post('/', 
        passport.isLoggedIn, 
        ebay.updateInventoryQuantity, 
        function (req, res) {

            Order.create(req.body)
                .then(order => {
                    order.setUser(req.user).then(order => {
                        res.status(200).json(order);
                    });
                })
                .catch(error => {
                    res.status(500).json(error);
                });
    });

    // Get All Orders
    router.get('/', passport.isEmployee, function (req, res, next) {
        Order.findAll({
            include: [OrderItem, User, Address]
          })
            .then(orders => {
                res.status(200).json(orders);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    });

    // Get Orders for User by ID
    router.get('/:userId', passport.isParamUser, function (req, res, next) {
        Order.findAll({
            where: { UserId: req.params.userId },
            include: [OrderItem, 
                      User, 
                      { model: Address, as: 'billingAddress' }, 
                      { model: Address, as: 'shippingAddress' },]
        })
            .then(orders => {
                res.status(200).send(orders);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    });

    // Update Order
    router.put('/:id', passport.isEmployee, function (req, res, next) {
        Order.update(req.body, {
            where: {
                id: req.params.id
            }
        })
            .then(updatedRecords => {
                res.status(200).json(updatedRecords);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    });

    app.use("/orders", router);
}
