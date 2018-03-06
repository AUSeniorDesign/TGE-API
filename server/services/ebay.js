/**
 * @author Haven Barnes <hab0020@auburn.edu>
 *
 * The Great Escape offers Items sold through auction AND at fixed price.
 * The notifications for these actions are ItemSold and FixedPriceTransaction,
 * respectively. Our development eBay account is set to  subscribe to these 
 * notifications and update our inventory appropriately.
 */
const express = require("express");
const xmlParser = require('xml2json');
const Item = require("../models").Item;

module.exports = function(app) {
  var router = express.Router();

  /**
   *  This is the endpoint eBay's Platform Notifications
   *  will send a request to when ItemSold and/or FixedPriceTransaction
   *  notifications fire. The endpoint figures out which notification
   *  was sent and then updates the database appropriately
   */
  router.post("/", function(req, res, next) {
    var json = parser.toJson(req.body);
  });

  app.use("/ebay", router);
};
