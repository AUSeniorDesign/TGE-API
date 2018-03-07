/**
 * @author Haven Barnes <hab0020@auburn.edu>
 */

express = require('express');

module.exports = function(app) {
  router = express.Router();
  router.use(express.static(process.cwd() + '/public'));
  app.use(router);
};
