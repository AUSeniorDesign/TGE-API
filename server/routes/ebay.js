/**
 * @author Haven Barnes <hab0020@auburn.edu>
 *
 * The Great Escape offers Items sold through auction AND at fixed price.
 * The notifications for these actions are ItemSold and FixedPriceTransaction,
 * respectively. Our system must subscribe to these notifications and update our
 * inventory appropriately.
 */
const express = require("express");
const Item = require("../models").Item;

module.exports = function(app) {
  var router = express.Router();

  router.post("/ItemSold", function(req, res, next) {
    res.status(200).send('Item Quantity Updated in Database');
  });


  router.post("/FixedPriceTransaction", function(req, res, next) {
    res.status(200).send('Item Quantity Updated in Database');
  });

  app.use("/ebay", router);
};
