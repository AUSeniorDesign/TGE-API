/**
 * @author Haven Barnes <hab0020@auburn.edu>
 */

var fs = require("fs");
var path = require("path");

var filePath = path.join(__dirname, "sample_import.csv");

var CsvReadableStream = require("csv-reader");
var inputStream = fs.createReadStream(filePath, "utf8");

var Item = require("../models").Item;

module.exports = function() {
  var parsedFieldsRow = false;

  inputStream
    .pipe(
      CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true })
    )
    .on("data", function(fields) {
      var item = {
        sku: fields[0],
        name: fields[1],
        description: fields[2],
        quantity: fields[3],
        price: fields[4],
        images: fields[5],
        productIdType: fields[17],
        brand: fields[18]
      };

      if (!parsedFieldsRow) {
        parsedFieldsRow = true;
        return;
      }

      Item.create(item).catch(function(error) {
        console.log(error);
      });
    })
    .on("end", function(data) {
      console.log("Finished reading in initial product data!");
    });
};
