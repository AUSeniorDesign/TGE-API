/**
 * @author Nicole McHone <ncm0011@auburn.edu>
 */

const express = require("express");
const Item = require("../models").Item;
const CartItem = require("../models").CartItem;
const Order = require("../models").Order;
const Facebook = require("../models").Facebook;
const Credential = require("../models").Credential;

module.exports = function(app, passport) {
  var router = express.Router();

  router.get('/', function (req, res, next) {
    Item.findAll({
        include: [CartItem]
      })
        .then(items => {
            res.status(200).json(items);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

  router.get("/:id", function(req, res, next) {
    Item.findById(req.params.id)
      .then(function(item) {
        res.status(200).json(item);
      })
      .catch(function(error) {
        res.status(500).json(error);
      });
  });

  // Update
  router.put("/", function(req, res, next) {
    Item.update(req.body.item, {
      where: {
        id: req.params.id
      }
    })
      .then(function(updatedRecords) {
        res.status(200).json(updatedRecords);
      })
      .catch(function(error) {
        res.status(500).json(error);
      });
  });

  router.delete("/:id", function(req, res, next) {
    Item.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(deletedRecords) {
        res.status(200).send(deletedRecords + ' deleted');
      })
      .catch(function(error) {
        res.status(500).json(error);
      });
  });

  app.use("/items", router);
};
