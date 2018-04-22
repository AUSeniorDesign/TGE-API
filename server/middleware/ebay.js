/**
 * @author Haven Barnes <hab0020@auburn.edu>
 */

const request = require("request-promise");
const Item = require("../models").Item;

const SERVICE_URLS = {
  bulkUpdateInventory:
    "https://api.ebay.com/sell/inventory/v1/bulk_update_price_quantity"
};

/**
 * Middle ware function that Updates Inventory on eBay
 * eBay bulkUpdatePriceQuantity Documentation:
 * https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkUpdatePriceQuantity
 */

// module.exports.itemSoldListener = function(req, res, next){
//   var soap = req.body.OrderItems.map(item => {
//     return {
//       sku: item.sku,
//       shipToLocationAvailability: {
//         quantity: item.quantity
//       }
//     };
// }
// var myService = {
//   MyService: {
//       MyPort: {
//           MyFunction: function(args) {
//               return {
//                   name: args.name
//               };
//           },

//           // This is how to define an asynchronous function.
//           MyAsyncFunction: function(args, callback) {
//               // do some work
//               callback({
//                   name: args.name
//               });
//           },

//           // This is how to receive incoming headers
//           HeadersAwareFunction: function(args, cb, headers) {
//               return {
//                   name: headers.Token
//               };
//           },

//           // You can also inspect the original `req`
//           reallyDetailedFunction: function(args, cb, headers, req) {
//               console.log('SOAP `reallyDetailedFunction` request from ' + req.connection.remoteAddress);
//               return {
//                   name: headers.Token
//               };
//           }
//       }
//   }
// };

// var xml = require('fs').readFileSync('myservice.wsdl', 'utf8');

// //http server example
// var server = http.createServer(function(request,response) {
//   response.end('404: Not Found: ' + request.url);
// });

// server.listen(8000);
// soap.listen(server, '/wsdl', myService, xml);

// //express server example
// var app = express();
// //body parser middleware are supported (optional)
// app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));
// app.listen(8001, function(){
//   //Note: /wsdl route will be handled by soap module
//   //and all other routes & middleware will continue to work
//   soap.listen(app, '/wsdl', myService, xml);
// });

module.exports.updateInventoryQuantity = function(req, res, next) {
  var itemRequests = req.body.OrderItems.map(item => {
    return {
      sku: item.sku,
      shipToLocationAvailability: {
        quantity: item.quantity
      }
    };
  });

  var options = {
    method: "POST",
    uri: SERVICE_URLS.bulkUpdateInventory,
    body: {
      requests: itemRequests
    },
    headers: {
      Authorization: "Bearer " + process.env.EBAY_APP_TOKEN
    },
    json: true
  };

  request(options)
    .then(response => {
      // POST succeeded...
      console.log(response);

      next();
    })
    .catch(error => {
      console.log(error);
      res.status(500).send("Failed to Update Ebay Inventories");
    });
};
