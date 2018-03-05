/**
 * @author Haven Barnes <hab0020@auburn.edu>
 */

const request = require('request-promise');
const xmlParser = require('xml2json');
const Item = require('../models').Item;

const SERVICE_URLS = {
    bulkUpdateInventory: 'https://api.ebay.com/sell/inventory/v1/bulk_update_price_quantity'
}

 module.exports = {
     
   /** 
    * Middle ware function that Updates Inventory on eBay
    * eBay bulkUpdatePriceQuantity Documentation:
    * https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkUpdatePriceQuantity
    */ 
    updateInventoryQuantity = function (req, res, next) {

        var itemRequests = req.body.OrderItems.map(item => {
            return {
                sku: item.sku,
                shipToLocationAvailability: {
                    quantity: item.quantity
                }
            }
        });

        var options = {
            method: 'POST',
            uri: SERVICE_URLS.bulkUpdateInventory,
            body: {
                requests: itemRequests
            },
            json: true 
        };

        request(options)
        .then(xmlResponse => {
            // POST succeeded...
            var response = xmlParser.toJson(xmlResponse);
            
            console.log(response);

            next();
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Failed to Update Ebay Inventories');
        });

        
    }
 }