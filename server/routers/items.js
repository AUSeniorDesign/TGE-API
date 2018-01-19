var express = require('express');

module.exports = function(app) {
  var router = express.Router();

  router.get('/', function (req, res, next) {
    res.send({
        items: [
            {
                name: "Folsom Prison Blues Vinyl"
            },
            {
                name: "Spiderman vs. Wolfman Comic Book"
            },
            {
                name: "Super Nintendo Entertainment System"
            },
            {
                name: "Super Nintendo Entertainment System"
            }
        ]
    });
  });

  app.use("/items", router);
}



