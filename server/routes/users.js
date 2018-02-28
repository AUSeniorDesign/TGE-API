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

////////////////////////////////////////////////
// Routes
////////////////////////////////////////////////

module.exports = function(app, passport) {
  var router = express.Router();

  /**
   *  Username / Password Login
   *
   *  Takes request body with credentials.
   * 
   *  Please note that 'username' is expected to be an email, however
   *  Passport's LocalStrategy specifically expects a 'username' property
   * 
   *  Body MUST be in the following format:
   *  req.body = {
   *    username: 'myusername',
   *    password: 'mypassword'
   *  }
   */
  router.post("/login", passport.authenticate("local"), function(req, res, next) {
    res.status(200).send(req.user);
  });

  /**
   *  Username / Password Signup
   *
   *  Takes request body with credentials.
   * 
   *  Please note that 'username' is expected to be an email, however
   *  Passport's LocalStrategy specifically expects a 'username' property
   * 
   *  Body MUST be in the following format:
   *  req.body = {
   *    username: 'email@email.com',
   *    password: 'mypassword'
   *  }
   */
  router.post("/signup", function(req, res, next) {
    Credential.findOrCreate({
      where: { email: req.body.username },
      defaults: req.body
    })
      .spread((credential, created) => {
        if (!created) {
          res.status(400).send("User with this email already exists");
          return;
        }

        User.create()
          .then(user => {
            user.setCredential(credential).then(function() {
              res.status(200).json(user);
            });
          })
          .catch(function(error) {
            res.status(500).json(error);
          });
      })
      .catch(function(error) {
        res.status(500).json(error);
      });
  });

  /**
   *  Facebook Login
   *
   *  Takes request body with facebook token.
   *  Body MUST be in the following format:
   *  req.body = {
   *      access_token: 'abc1234567890'
   *  }
   */
  router.post("/login/facebook", function(req, res, next) {
    passport.authenticate("facebook-token");
  });

  ////////////////////////////////////////////////
  // CRUD Methods
  ////////////////////////////////////////////////

  // Get All Users
  // ADMIN ONLY
  router.get("/", passport.isAdmin, function(req, res, next) {
    User.findAll({ include: [Credential, Facebook]}).then(users => {
      res.status(200).json(users);
    }).catch(function(error) {
      res.status(500).json(error);
    });
  });

  // Get User by ID
  // EMPLOYEES/ADMINS ONLY
  router.get("/:id", passport.isEmployee, function(req, res, next) {
    User.findById(req.params.id)
      .then(function(user) {
        res.status(200).json(user);
      })
      .catch(function(error) {
        res.status(500).json(error);
      });
  });

  // Update User
  router.put("/:id", passport.isParamUser, function(req, res, next) {
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

  // Update user God mode.
  // DEVELOPMENT ONLY
  // TODO: Disable endpoint before production release.
  router.put("/dev/:id", passport.isDev, function(req, res, next) {
    User.update(req.body, {
      where: {
        id: req.params.user.id
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
  router.delete("/:id", passport.isLoggedIn, function(req, res, next) {
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
  router.get("/cart", function(req, res, next) {
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
  router.post("/cart", function(req, res, next) {
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

  /**
   * Delete Item Shopping Cart
   */
  router.delete("/:id/cart", function(req, res, next) {
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

  app.use("/users", router);

};
