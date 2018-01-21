express = require('express');

module.exports = function(app) {
  router = express.Router();

  router.get('/', function(req, res, next) {
    res.json({status: 'UP'});
  });

  app.use('/health', router);
};
