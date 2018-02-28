/**
 * @author Haven Barnes <hab0020@auburn.edu>
 */

const express = require('express');
const Item = require('../models').Item;

// Store Items Endpoints
module.exports = function(app) {
  var router = express.Router();

    router.get('/', function (req, res, next) {
        Item.findAll()
            .then(function (users) {
                res.status(200).json(users);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    });


  app.use('/items', router);
};
