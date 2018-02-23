const User = require("../models/user");
const Credential = require("../models/credential");
const LocalStrategy = require("passport-local").Strategy;
const FacebookTokenStrategy = require("passport-facebook-token").Strategy;
const GoogleTokenStrategy = require("passport-google-token").Strategy;

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(function(email, password, done) {
      Credential.findOne({ where: { email: email } }).then(credential => {
        if (!credential) {
          return done(null, false);
        }
        if (!credential.verifyPassword(password)) {
          return done(null, false);
        }
        return done(null, credential);
      });
    })
  );
  
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // passport.use(
  //   new FacebookTokenStrategy(
  //     {
  //       clientID: process.env.FB_APP_ID,
  //       clientSecret: process.env.FB_APP_SECRET
  //     },
  //     function(accessToken, refreshToken, profile, done) {
  //       Facebook.findOne({ where: { facebookId: profile.id } }).then(
  //         facebook => {
  //           return done(error, facebook);
  //         }
  //       );
  //     }
  //   )
  // );

  //   passport.use(
  //     new GoogleTokenStrategy(
  //       {
  //         clientID: GOOGLE_APP_ID,
  //         clientSecret: GOOGLE_APP_SECRET
  //       },
  //       function(accessToken, refreshToken, profile, done) {
  //         Google.findOne({ where: { googleId: profile.id } }).then(google => {
  //           return done(error, google);
  //         });
  //       }
  //     )
  //   );
};
