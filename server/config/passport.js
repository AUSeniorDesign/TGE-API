const User = require('../models/user');
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

    passport.use(new FacebookTokenStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET
    }, function (accessToken, refreshToken, profile, done) {
        User.findOrCreate({ name: profile.name, facebookId: profile.id }, function (error, user) {
            return done(error, user);
        });
    }));
};