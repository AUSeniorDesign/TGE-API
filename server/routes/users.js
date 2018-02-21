const express = require("express");
const passport = require("passport");
const User = require("../models").User;
const Item = require("../models").Item;
const CartItem = require("../models").CartItem;
const Order = require("../models").Order;
const Facebook = require("../models").Facebook;
const Google = require("../models").Google;
const Local = require("../models").Local;

////////////////////////////////////////////////
// Helper Functions
////////////////////////////////////////////////

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).end("Not logged in");
}

////////////////////////////////////////////////
// Routes
////////////////////////////////////////////////

module.exports = function(app, passport) {
  var router = express.Router();

  ///////////////////////////
  // Username / Password
  ///////////////////////////

  router.post("/", function(req, res, next) {
    User.create()
      .then(function(newUser) {
        res.status(200).json(newUser);
      })
      .catch(function(error) {
        res.status(500).json(error);
      });
  });

  // Login
  router.post("/login", function(req, res, next) {
    passport.authenticate("local");
  });

  router.post("/create", function(req, res, next) {
    Local.findOne({ where: { username: req.body.local.username } }).then(
      existingUser => {
        if (existingUser) {
          res.status(400).send("User with username already exists");
          return;
        }

        var password = req.body.password;
        delete req.body.password;

        User.create({
          Credentials: req.body.local
        })
          .then(function(newUser) {
            hashPassword(newUser, password);
            res.status(200).json(newUser);
          })
          .catch(function(error) {
            res.status(500).json(error);
          });
      }
    );
  });

  ///////////////////////////
  // Facebook
  ///////////////////////////

  router.post("/facebook", function(req, res, next) {
    passport.authenticate("facebook-token");
  });

  // Create User w/ Facebook
  router.post("/create/facebook", function(req, res, next) {
    // TODO: Authenticate Facebook token here (combine logic from endpoint above)
    Facebook.findOne({ where: { facebookId: req.body.facebook.facebookId } })
      .then(function(facebook) {
        // Already Exists
        if (facebook) {
          res
            .status(400)
            .end(
              "This Facebook account is already used with " +
                " a different TGE account."
            );
          return;
        }

        Facebook.create(req.body.facebook).then(facebook => {
          User.create()
            .then(user => {
              user.setFacebook(facebook).then(function() {
                User.findOne({
                  where: { id: user.id },
                  include: [Facebook]
                }).then(user => {
                  res.status(200).json(user);
                });
              });
            })
            .catch(function(error) {
              console.log(error);
              res.status(500).json(error);
            });
        });
      })
      .catch(function(error) {
        console.log(error);
        res.status(500).json(error);
      });
  });

  ///////////////////////////
  // CRUD Methods
  ///////////////////////////

  // Get User by ID
  router.get("/:id", isLoggedIn, function(req, res, next) {
    User.findById(req.params.id)
      .then(function(user) {
        res.status(200).json(user);
      })
      .catch(function(error) {
        res.status(500).json(error);
      });
  });

  // Update User
  router.put("/:id", isLoggedIn, function(req, res, next) {
    User.update(req.body, {
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

  // Delete User
  router.delete("/:id", isLoggedIn, function(req, res, next) {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(deletedRecords) {
        res.status(200).json(deletedRecords);
      })
      .catch(function(error) {
        res.status(500).json(error);
      });
  });

  // Get Shopping Cart
  router.get("/:id/cart", function(req, res, next) {
    CartItem.findAll({
      where: { UserId: req.params.id },
      include: [Item]
    })
      .then(carts => {
        res.status(200).json(carts);
      })
      .catch(function(error) {
        res.status(500).json(error);
      });
  });

  // Add Item Shopping Cart
  router.post("/:id/cart", function(req, res, next) {
    CartItem.create({
      UserId: req.params.id,
      ItemId: req.body.itemId
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

  // Get Shopping Cart
  router.get("/:id/orders", function(req, res, next) {
    Order.findAll({
      where: { UserId: req.params.id },
      include: [Item]
    })
      .then(carts => {
        res.status(200).json(carts);
      })
      .catch(function(error) {
        res.status(500).json(error);
      });
  });

  // Add Item Shopping Cart
  router.post("/:id/orders", function(req, res, next) {
    Order.create({
      UserId: req.params.id,
      ItemId: req.body.itemId
    }).then(order => {
      Order.findAll({
        where: { UserId: cart.UserId },
        include: [Item]
      })
        .then(orders => {
          res.status(200).json(orders);
        })
        .catch(function(error) {
          res.status(500).json(error);
        });
    });
  });

  app.use("/users", router);
};
