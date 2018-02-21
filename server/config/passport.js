const User = require("../models/user");
const Local = require("../models/local");
const Facebook = require("../models/facebook");
const Google = require("../models/google");
const LocalStrategy = require("passport-local");
const FacebookTokenStrategy = require("passport-facebook-token");
const GoogleTokenStrategy = require("passport-google-token");

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(
    new LocalStrategy(function(email, password, done) {
      Local.findOne({ where: { email: email } }).then(credentials => {
        if (!credentials) {
          return done(null, false);
        }
        if (!credentials.verifyPassword(password)) {
          return done(null, false);
        }
        return done(null, credentials);
      });
    })
  );

  passport.use(
    new FacebookTokenStrategy(
      {
        clientID: process.env.FB_APP_ID,
        clientSecret: process.env.FB_APP_SECRET
      },
      function(accessToken, refreshToken, profile, done) {
        Facebook.findOne({ where: { facebookId: profile.id } }).then(
          facebook => {
            return done(error, facebook);
          }
        );
      }
    )
  );

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
