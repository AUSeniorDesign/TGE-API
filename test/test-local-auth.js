var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();

// Below code demonstrates using various methods of testing
describe('Testing local auth / password hashing', function() {

  describe('Testing with assert', function() {
    it('Tests assert.equal', function() {
      assert.equal("a", "a");
    });
    it('Tests assert.typeOf', function() {
      assert.typeOf("a", "string");
    });
    it('Tests assert.lengthOf', function() {
      assert.lengthOf([1,2,3], 3);
      assert.lengthOf("asd", 3);
    });
  });
});
