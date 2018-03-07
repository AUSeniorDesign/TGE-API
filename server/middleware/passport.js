const User = require("../models").User;
const Facebook = require("../models").Facebook;
const Credential = require("../models").Credential;
const CartItem = require("../models").CartItem;
const LocalStrategy = require("passport-local").Strategy;
const FacebookTokenStrategy = require("passport-facebook-token");

module.exports = function(passport) {
  /////////////////////////////////////
  // Security Middleware
  /////////////////////////////////////

  /**
   * isLoggedIn is a helper middleware that gets run through to guard against
   * unauthorized / unauthenticated requests.
   */
  passport.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.status(401).end("Not logged in");
  };

  /**
   * isEmployee is a helper middleware that gets run through to guard against
   * unauthorized / unauthenticated requests that should only be available
   * to Employees and Admins
   */
  passport.isEmployee = function(req, res, next) {
    if (
      req.isAuthenticated() &&
      (req.user.type == "admin" || req.user.type == "employee")
    ) {
      return next();
    }
    res.status(403).end("Not available to customers");
  };

  /**
   * isAdmin is a helper middleware that gets run through to guard against
   * unauthorized / unauthenticated requests that should only be available to
   * Admin Users
   */
  passport.isAdmin = function(req, res, next) {
    if (req.isAuthenticated() && req.user.type == "admin") {
      return next();
    }
    res.status(403).end("Only available to Admins");
  };

  /**
   * isParamUser is a helper middleware that gets run through to guard against
   * unauthorized / unauthenticated requests that should only be available to
   * to the user themselves, OR they are an admin, in which case they can make
   * whichever changes they would like.
   *
   * The main use case for admins' to change a user's data would be to elevate user
   * status in the system to 'employee' or 'admin'.
   */
  passport.isParamUser = function(req, res, next) {
    if (
      req.isAuthenticated() &&
      (req.user.type == "admin" || req.param.id == req.user.id)
    ) {
      return next();
    }
    res
      .status(403)
      .end("You cannot update user data that does not belong " + "to you");
  };

  /**
   * isDev is a helper middleware that gets run through to guard against
   * unauthorized / unauthenticated requests that should only be available to
   * Devs. This does not actually require being logged in and will be taken out
   * in production.
   *
   * The main use is for designating the inital Admins in
   * The Great Escape system.
   *
   * TODO: Take this out before production release.
   */
  passport.isDev = function(req, res, next) {
    if (req.body.secret == "secret!") {
      return next();
    }
    res.status(403).end("Only available to Developers!");
  };

  /////////////////////////////////////
  // Login Strategies
  /////////////////////////////////////

  /**
   * Sets up Passport's Local Strategy, which uses username and password
   * via the Credential model to verify a user's identitiy. The Local Strategy
   * closure is called via the /users/login route as middleware
   */
  passport.use(
    new LocalStrategy(function(username, password, done) {
      Credential.findOne({ where: { email: username } }).then(credential => {
        if (!credential) {
          return done(null, false);
        }

        credential.verifyPassword(password).then(result => {
          if (!result) {
            return done(null, false);
          }

          User.findOne({
            where: { id: credential.UserId },
            include: [Credential]
          })
            .then(user => {
              return done(null, user);
            })
            .catch(function(error) {
              return done(error, false);
            });
        });
      });
    })
  );

  /**
   * Sets up Passport's Facebook Token Strategy, which uses a Facebook token
   * via the Facebook model to verify a user's identitiy. The strategy's
   * closure is called via the /users/login/facebook route as middleware.
   *
   * The logic of this 'passport.use' closure acts as both a signup and a login
   * feature, depending on whether this facebook profile has been used before.
   * If it has, it returns the User object associated. If not, it creates a
   * User, associates the new Facebook object with it and returns the new User.
   */
  passport.use(
    new FacebookTokenStrategy(
      {
        clientID: process.env.FB_APP_ID,
        clientSecret: process.env.FB_APP_SECRET,
        profileFields: ["id", "displayName", "name", "email"]
      },
      function(accessToken, refreshToken, fbProfile, done) {
        process.nextTick(function() {
          Facebook.findOrCreate({
            where: { facebookId: fbProfile.id },
            defaults: {
              facebookId: fbProfile.id,
              token: accessToken,
              refreshToken: refreshToken,
              email: fbProfile.emails[0].value,
              name: fbProfile.displayName
            }
          })
            .spread((facebook, created) => {
              if (created) {
                // New Facebook, create new User and associate
                User.create()
                  .then(user => {
                    user.setFacebook(facebook).then(function() {
                      User.findOne({
                        where: { id: user.id },
                        include: [Facebook, CartItem]
                      }).then(user => {
                        return done(null, user);
                      });
                    });
                  })
                  .catch(function(error) {
                    return done(error, false);
                  });
              } else {
                // Find existing associated User and return it instead
                User.findOne({
                  where: { id: facebook.UserId },
                  include: [Facebook]
                }).then(user => {
                  return done(null, user);
                });
              }
            })
            .catch(function(error) {
              return done(error, false);
            });
        });
      }
    )
  );

  /**
   * This defines the way of serializing users to the db
   * for use during the current session.
   */
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  /**
   * This defines a way of deserializing a user from the db
   * so that endpoints can gather context as to who is making requests.
   */
  passport.deserializeUser(function(id, done) {
    User.findOne({
      where: { id: id },
      include: [Credential, Facebook, CartItem]
    })
      .then(user => {
        done(null, user);
      })
      .catch(function(error) {
        done(error, null);
      });
  });
};
