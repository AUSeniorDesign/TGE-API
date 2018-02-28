require('appmetrics-dash').attach();
require('appmetrics-prometheus').attach();

const appName = require('./../package').name;
const express = require('express');
const log4js = require('log4js');
const passport = require('passport');
const localConfig = require('./config/local');
const path = require('path');
const logger = log4js.getLogger(appName);
const bodyParser = require('body-parser')
const serviceManager = require('./services/service-manager');

const app = express();
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));


// Passport for Username/Password and Facebook
app.use(passport.initialize())
app.use(passport.session())

require('./services/index')(app);
require('./middleware/passport')(passport);
require('./routes/index')(app, passport);

// Configure app models (see models/index.js)
app.set('models', require('./models'));

const port = process.env.PORT || localConfig.port;

// Make sure models / db is configured and start up express app\
var resetFlag = process.argv.length == 3 && process.argv[2] == 'reset'
app.get('models').sequelize.sync({ force: resetFlag }).then(function () {

  if (resetFlag) {
    var dbInit = require('./init/db_init');
    dbInit();
  }

  app.listen(port, function () {
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
