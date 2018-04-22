/**
 * @author Haven Barnes <hab0020@auburn.edu>
 */

const express = require("express");
const User = require("../models").User;
const Item = require("../models").Item;
const CartItem = require("../models").CartItem;
const Order = require("../models").Order;
const Facebook = require("../models").Facebook;
const Credential = require("../models").Credential;

module.exports = function(app, passport) {
  var router = express.Router();

  // Get Shopping Cart
  router.get("/", passport.isLoggedIn, function(req, res, next) {
    CartItem.findAll({
      where: { UserId: req.user.id },
      include: [Item]
    })
      .then(cartItems => {
        res.status(200).json(cartItems);
      })
      .catch(function(error) {
        res.status(500).json(error);
      });
  });

  // Add Item Shopping Cart
  router.post("/:itemId", passport.isLoggedIn, function(req, res, next) {
    CartItem.create({
      UserId: req.user.id,
      ItemId: req.params.itemId
    }).then(cart => {
      CartItem.findAll({
        where: { UserId: cart.UserId },
        include: [Item]
      })
        .then(carts => {
          res.status(200).json(carts);
        })
        .catch(function(error) {
          res.status(500).json(error);
        });
    });
  });

  // Delete Item Shopping Cart by CartItem ID
  router.delete("/:itemId", passport.isLoggedIn, function(req, res, next) {
    CartItem.destroy({
      where: {
        UserId: req.user.id,
        id: req.params.itemId
      }
    })
      .then(function(deletedRecords) {
        res.status(200).json(deletedRecords + " deleted");
      })
      .catch(function(error) {
        res.status(500).json(error);
      });
  });

  // Checkout w/ Sqaure, convert to Order
  router.post("/checkout", passport.isLoggedIn, function(req, res, next) {
      CartItem.findAll({
        where: { UserId: req.user.id },
        include: [Item]
      }).then(cartItems => {
        res.status(200).json(cartItems);

        let cardNonce = req.body.nonce;
        const tax = 0.0; // TODO: Add Tax Logic
        let total = cartItems.reduce((a, b) => a.Item.price + b.Item.price, tax);

        const location = "CBASEDnEqxa5dSbQs3ak_XJtqiwgAQ";
        // Sandbox access token TODO: add this as env variable when we do actually go to production
        const accessToken = "sandbox-sq0atb-AIVmTputqFCPd4pTVProVQ";

        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            card_nonce: cardNonce,
            amount_money: {
              amount: total,
              currency: "USD"
            },
            idempotency_key: str(uuidv4())
          })
        };
        console.log(requestOptions);

        return fetch(
          `https://connect.squareup.com/v2/locations/${location}/transactions`,
          requestOptions
        ).then(response => {
          res.status(200).json(response);
        });


      }).catch(function(error) {
        res.status(500).json(error);
      });
    });
    

  app.use("/cart", router);
};

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
