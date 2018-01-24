// http://sequelize.readthedocs.io/en/v3/
module.exports = (sequelize, DataTypes) => {
    var Item = sequelize.define('Item', {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL(10, 2),
      shippingCost: DataTypes.DECIMAL(10, 2),
      // TODO: Make condition an ENUM type once we get a defined list
      condition: DataTypes.STRING,
      // TODO: Make category an ENUM type once we get a defined list
      category: DataTypes.STRING
    });
  
    return Item;
};