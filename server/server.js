require('appmetrics-dash').attach();
require('appmetrics-prometheus').attach();

const appName = require('./../package').name;
const express = require('express');
const log4js = require('log4js');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const localConfig = require('./config/local.json');
const path = require('path');
const logger = log4js.getLogger(appName);
const bodyParser = require('body-parser')
const serviceManager = require('./services/service-manager');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./services/index')(app);
require('./routes/index')(app);

// Configure app models (see models/index.js)
app.set('models', require('./models'));


// Passport
app.use(passport.initialize())
app.use(passport.session())

// passport.use(new Strategy({
//   clientID: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
//   callbackURL: "http://localhost:3000/"
// },
//   function (accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));


const port = process.env.PORT || localConfig.port;

// Make sure models / db is configured and start up express app
const clearOutDatabase = false; // Set to true if you want db to be reset when app starts
app.get('models').sequelize.sync({ force: clearOutDatabase }).then(function () {
  app.listen(port, function () {
    logger.info(`TGEAPIReact listening on http://localhost:${port}/appmetrics-dash`);
    logger.info(`TGEAPIReact listening on http://localhost:${port}`);
  });
});

// Configure 404 page
app.use(function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/assets', '404.html'));
})

// Configure 500 Error page
app.use(function (err, req, res, next) {
  res.sendFile(path.join(__dirname, '../public/assets', '500.html'));
})

module.exports = app;