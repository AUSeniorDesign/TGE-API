// http://sequelize.readthedocs.io/en/v3/
module.exports = (sequelize, DataTypes) => {
    var Item = sequelize.define('Item', {
      name: DataTypes.STRING,
      // Choosing a floating point for inventory field to be safe on the OFF chance something is sold in a weight unit
      quantity: DataTypes.DECIMAL(10, 2),
      price: DataTypes.DECIMAL(10, 2),
      sku: DataTypes.STRING,
      description: DataTypes.STRING,
      images: DataTypes.STRING,
      isFeatured: DataTypes.BOOLEAN,
      productIdType: DataTypes.STRING,
      brand: DataTypes.STRING,
      // TODO: Make category an ENUM type once we get a defined list
      category: DataTypes.STRING
    });
  
    return Item;
};