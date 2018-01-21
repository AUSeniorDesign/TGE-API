express = require('express');

module.exports = function(app) {
  router = express.Router();

  router.get('/', function(req, res, next) {
    res.send({
        items: [
            {
                name: 'Folsom Prison Blues Vinyl',
                image: 'http://www.saga.co.uk/contentlibrary/saga/publishing/verticals/money/personal-finance/making-money/selling-vinyl-shutterstock-234267241.jpg',
            },
            {
                name: 'Spiderman vs. Wolfman Comic Book',
                image: 'http://media.comicbook.com/uploads1/2015/02/amazing-spider-man-136-cover-123891.jpg',
            },
            {
                name: 'X-Men Lunch Box',
                image: 'https://images-na.ssl-images-amazon.com/images/I/81KDIV6ABvL._SY355_.jpg',
            },
            {
                name: 'Super Nintendo Entertainment System',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/SNES-Mod1-Console-Set.jpg/1200px-SNES-Mod1-Console-Set.jpg',
            },
        ],
    });
  });

  app.use('/items', router);
};
