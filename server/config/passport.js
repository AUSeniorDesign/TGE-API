const User = require('../models/user');
const LocalStrategy = require('passport-local');
const FacebookTokenStrategy = require('passport-facebook-token');

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({ where: { username: username } }).then(user => {
                if (!user) { return done(null, false); }
                if (!user.verifyPassword(password)) { return done(null, false); }
                return done(null, user);
            });
        }
    ));

    passport.use(new FacebookTokenStrategy({
        clientID: process.env.FB_APP_ID,
        clientSecret: process.env.FB_APP_SECRET
      }, function(accessToken, refreshToken, profile, done) {
        User.findOne ({ where: {facebookId: profile.id} }).then(user => {
          return done(error, user);
        });
      }
    ));
};