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

  // Username / Password Login
  /** 
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
  router.post("/login", passport.authenticate("local"), 
    function(req, res, next) {
    res.status(200).send(req.user);
  });

  // Username / Password Signup
  /** 
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
   *
   *  The steps of the signup process are currently:
   *      1. Search if email already exists and create Credential for it if not
   *      2. Create a new User and associatie user and Credential
   *      3. Login User to session via Passport
   *      4. Return current User object in response.
   *
   *  TODO: Migrate the findOrCreate Logic to the LocalStrategy's definition in
   *        passport.js to make this a bit simpler.
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
                next();
              });
            })
            .catch(function(error) {
              res.status(500).json(error);
            });
        })
        .catch(function(error) {
          res.status(500).json(error);
        });
    },
    passport.authenticate("local"),
    function(req, res, next) {
      if (req.user) {
        res.status(200).json(req.user);
      } else {
        res.status(500).send("Signup failed.");
      }
    }
  );

  // Facebook Login
  /**
   *  Takes request body with facebook access token.
   *
   *  Body MUST be in the following format:
   *  req.body = {
   *      access_token: 'abc1234567890'
   *  }
   *
   *  IMPORTANT: Currently if you pass this endpoint an invalid access token,
   *  the passport middleware does not handle the res and the request
   *  ends up 404'ing
   *  TODO: See if we can adjust the above issue to return a 401/403 with more info.
   */
  router.post("/auth/facebook", passport.authenticate("facebook-token"),
    function(req, res, next) {
      res.status(200).json(req.user);
    }
  );

  // Logs in with passport's local strategy
  router.post("/login", passport.authenticate("local"), 
    function(req, res, next) {
    res.status(200).json(req.user);
  });

  // Simple Logout Endpoint, expects Nothing
  router.get("/logout", function(req, res) {
    req.logout();
    res.status(200).send("Logged out.");
  });

  // Get All Users
  /**
   *
   * For admins only.
   *
   * The main use of this endpoint is for an admin to
   * search for other users in the system and elevate / revoke
   * their user staus to 'admin', 'employee', or down to 'customer'.
   */
  router.get("/", passport.isAdmin, function(req, res, next) {
    User.findAll({ include: [Credential, Facebook] })
      .then(users => {
        res.status(200).json(users);
      })
      .catch(function(error) {
        res.status(500).json(error);
      });
  });

  // Get Own User Object
  router.get("/me", passport.isLoggedIn, function(req, res, next) {
    User.find({
      where: { id: req.user.id },
      include: [Credential, Facebook, CartItem]
    })
      .then(function(user) {
        res.status(200).json(user);
      })
      .catch(function(error) {
        res.status(500).json(error);
      });
  });

  // Get User by ID
  // Employees / Admins only
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
  router.put("/", passport.isLoggedIn, function(req, res, next) {
    User.update(req.body.user, {
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

  // Update user in God mode.
  // DEVELOPMENT ONLY
  // TODO: Disable endpoint before production release.
  router.put("/dev/:id", passport.isDev, function(req, res, next) {
    User.update(req.body.user, {
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
  router.delete("/:id", passport.isParamUser, function(req, res, next) {
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

  app.use("/users", router);
};
